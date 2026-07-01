const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require("jsonwebtoken");

const use = require('./models/User')
const courseDB = require('./models/Course')
const registerDB = require('./models/Register')
const app = express()
app.use(cors())
app.use(express.json())
mongoose
    .connect(process.env.MONGO_URI).then(() => {
        console.log("Success")
    }).catch((error) => {
        console.log(error)
    })

app.get("/", (req, res) => {
    res.send("<h1>Server is on</h1>")
})
app.post("/api/register", async (req, res) => {
    try {

        const { fullName, email, password } = req.body;
        const existingUser = await use.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered", })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new use({
            fullName: fullName,
            email: email,
            password: hashedpassword,
        })
        await newUser.save()
        res.status(200).json({
            message: 'regiteration success'
        })
    }
    catch (error) {

        res.status(500).json({
            message: 'registration failed',
            error: error.message
        })
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await use.findOne({ email: email })

        if (!user) {
            res.status(400).json({ message: 'invalid email or password' })
            return;
        }

        let correct = await bcrypt.compare(password, user.password)
        if (!correct) {
            res.status(400).json({ message: 'invalid email or password' });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        const userData = { id: user._id, email: user.email }
        res.status(200).json({ message: 'Login Successful', token: token, userData: userData })
        return;
    }
    catch (error) {

        res.status(500).json({ message: 'login failed', error: error.message })
    }
})

//--------------------------Getting User Details------------------

app.get("/user/getDetails", async (req, res) => {
    const { id } = req.query;
    try {

        const user = await use.findById(id)

        const registered = await registerDB.find({ user: id }).populate("course")
        const userData = {
            name: user.fullName,
            email: user.email,
            NumberOfCourses: registered.length
        }

        res.send(userData)
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

//---------------Update UserName-----------------------

app.put("/user/updateUserName", async (req, res) => {
    const { id, newUserName } = req.query
    try {
        await use.findByIdAndUpdate(id, { fullName: newUserName }, { returnDocument: 'after' })
        res.status(201).json({ message: 'edit success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running at " + `${process.env.PORT}`)
})

//--------------Update user Email--------------------------

app.put("/user/updateUserEmail", async (req, res) => {
    const { id, newUserEmail } = req.query
    try {
        await use.findByIdAndUpdate(id, { email: newUserEmail }, { returnDocument: 'after' })
        res.status(201).json({ message: 'edit success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//---------------------change password-----------------------------

app.put("/user/changePassword", async (req, res) => {
    const { id } = req.query
    const { email, oldPassword, newPassword } = req.body;
    try {

        const user = await use.findById(id);
        if (user.email !== email) {
            res.status(400).json({ message: 'invalid email or old password' })
            return;
        }
        let correct = await bcrypt.compare(oldPassword, user.password)

        if (!correct) {
            res.status(400).json({ message: 'invalid email or oldpassord' })
            return;
        }

        const newHashPassword = await bcrypt.hash(newPassword, 10)

        await use.findByIdAndUpdate(id, { password: newHashPassword }, { returnDocument: 'after' })
        res.status(200).json({ message: 'password updated' })
    }
    catch (error) {
        res.status(500).json({ error: error.message }, { message: 'server failed' })
    }
})

//------------------------Adding Courses------------------------------
app.post("/course/AddCourse", async (req, res) => {
    const { courseName, duration, Mode, type } = req.body

    try {
        const newCourse = new courseDB({
            courseName: courseName,
            duration: duration,
            Mode: Mode,
            type: type
        })
        await newCourse.save()
        res.status(200).json({ message: 'Course Added successfully' })
    }
    catch (error) {
        res.status(500).json({ message: 'Adding Course Failed', error: error.message })
    }
})

//--------------------------Getting All Courses-------------------------------

app.get("/course/getAllCourses", async (req, res) => {
    try {
        const courses = await courseDB.find();
        res.json(courses)
    }
    catch (error) {
        res.json({ message: 'Cannot get data', error: error.message })
    }
})

//-------------------------student registering course----------------

app.post("/user/registerCourse", async (req, res) => {
    const { user_id, course_id } = req.body;
    try {

        const newRegister = new registerDB({
            user: user_id,
            course: course_id
        })

        await newRegister.save()
        res.status(200).json({ message: 'Registration Successfull' });
    }
    catch (error) {

        res.status(500).json({ message: 'Server Failed', error: error.message })
    }
})


//---------------------Get Student Registered Courses--------------
app.get("/course/getRegisteredCourses", async (req, res) => {
    const { id } = req.query
    try {

        const data = await registerDB.find({ user: id }).populate("course")

        const courses = data.map(r => r.course)
        res.json(courses)
    }
    catch (error) {
        res.json({ message: 'Cannot get data', error: error.message })
    }
})

//-------------------------Counting Number of Students Reistered for a course---------------------------

app.get("/course/getCountOfStudents", async (req, res) => {
    const { id } = req.query
    try {
        const data = await registerDB.find({ course: id }).populate("user")
        res.json({ count: data.length })
    }
    catch (error) {
        console.log(error)
    }
})

//---------------------------Unregister Course-------------------------

app.post("/course/unRegister", async (req, res) => {
    const { user_id, course_id } = req.body;
    try {
        const delete1 = await registerDB.findOneAndDelete({ user: new mongoose.Types.ObjectId(user_id), course: new mongoose.Types.ObjectId(course_id) });

        res.json({ message: 'Course Unregistered successfully' })
    }
    catch (error) {
        res.json({ message: 'Some thing went wrong', error: error.message })
    }
})
