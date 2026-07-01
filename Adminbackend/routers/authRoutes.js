const express=require('express');
const router=express.Router();
const {login,register} =require('../controllers/auth');
const {getCourses,addCourse,deleteCourse,editCourse} =require('../controllers/crud');
const {getStudents,deleteStudent,studentCourses,adminAddStudent} =require('../controllers/student');

router.post('/login',login);
router.post('/register',register);
router.get('/courses',getCourses);
router.post('/addCourse',addCourse);
router.delete('/deleteCourse',deleteCourse);
router.post('/editCourse',editCourse);
router.get('/getStudents',getStudents);
router.delete('/deleteStudent',deleteStudent);
router.get('/studentCourses',studentCourses);
router.post('/adminAddStudent',adminAddStudent);

module.exports=router