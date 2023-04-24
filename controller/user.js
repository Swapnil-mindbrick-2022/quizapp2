const passport = require('passport')
const Results = require('../models/results')
const questions = require('../models/question')
const Candidates = require('../models/user')
const Excel = require('exceljs')
const fs = require('fs')
const Noty = require('noty')
// const nodemailer = require('nodemailer');
 function quizController(){
    //Register candidates----
    return {
        async registerCandidate(req,res){
           const {name,college,email,mobile,rollno} = req.body
            // const Name = req.body.name
            // const college = req.body.college
            // const email = req.body.email   //username is email--
            // const mobile = req.body.mobile
            // const rollno = req.body.rollno
            // const pswrd = req.body.rollno

            console.log(name,college,email,mobile,rollno)
            Candidates.findOne({username:email}).then((data)=>{
                if (data){
                    res.send('user already exists')
                }else{
                    const newUser = new Candidates({
                        Name:name,
                        College:college,
                        username:email,    //username is email--
                        Mobileno:mobile,
                        Rollno:rollno,
                        password:rollno
                    })
                    newUser.save().then((data)=>{
                        if (data){
                            // res.send(data)
                            return res.redirect('/')
                        }
                    }).catch(err=> res.send(err))
                }
            }).catch(err=> res.send(err))
            

            },
            async startTest(req,res){
                const useremail = req.user.username;
                const name = req.user.Name
                const hallticket = req.user.Rollno
                const startTime = new Date().getTime()

                Results.findOne({emailId:useremail}).then((data)=>{
                    if (data){
                        if (data.questionsAttempted == 30){
                            return res.send('You have already Appeared in this Test..')
                        }else{
                            return res.redirect('/questions')
                        }
                        
                    }
                    
                req.session.testStatus = "active"
                    const result = new Results({
                        emailId:useremail,
                        Name:name,
                        hallTicketNumber:hallticket,
                        totalMarks:70,
                        testStatus:'started',
                        startTime :startTime
                    })
                    result.save().then((data)=>{
                        // console.log(data)
                        res.redirect('/questions')
                    })
        
                .catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            async downloadResult(req,res){
                Results.find({}).then((data)=>{
                    
                  
                const workbook = new Excel.Workbook();
                const worksheet = workbook.addWorksheet('Test Results');

                // Add header row
                worksheet.addRow(['Email','Name','Hallticket', 'Total Marks', 'Marks Obtained','Date']);

                data.forEach(item => {
                    worksheet.addRow([
                      item.emailId,
                      item.Name,
                      item.hallTicketNumber,
                      item.totalMarks,
                      item.marksObtained,
                      item.date
                    ]);
                  });
                  // Save workbook
            const fileName = 'test-results.xlsx';
            workbook.xlsx.writeFile(fileName)
            .then(() => {
                console.log(data)
                console.log(`${fileName} has been created successfully.`);
                // Download file
                const file = fs.createReadStream(fileName);
                const stat = fs.statSync(fileName);
                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
                file.pipe(res);
            })

                  // res.send(resp)
                }).catch(err => res.send(err))
        
            },
            async updateMarks(req,res){
                const answer = req.body.answer
                const questionId = req.body.id
                let marksObtained = 0

                questions.findById({_id:questionId}).then((ans)=>{
                    if (ans.correctanswer == answer){
                        console.log('correct',ans.correctanswer,'selected',answer)
                        marksObtained = ans.marks
                      
                    }else if (answer.correctanswer !== answer){
                        console.log('is wrong--',answer )
                        marksObtained = 0
                    }
                    
                    
                const userid = req.user.username
                Results.findOneAndUpdate(
                    { emailId: userid },
                    { $inc: { questionsAttempted: 1, marksObtained: marksObtained } },
                    { new: true },
                ).then(result => res.send(result)).catch(err => res.send(err))
                
                }).catch(err => console.log(err))
                if (! req.user){
                    return res.redirect('/')
                }
                // console.log(marksObtained)
             
            }
    }
    }
module.exports = quizController