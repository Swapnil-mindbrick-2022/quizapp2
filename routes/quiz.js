const createCandidate = require('../controller/user')
const user = require('../middlewares/user')
const Getquestion = require('../models/question')
const passport = require('passport')
const results = require('../models/results')
const canditate = require('../models/user')
const Noty = require("noty");
function quizRoute(app){

    // app.post('/insertcollection',(req,res)=>{
    //     const test = req.body.test
    //     const data = [
    //         {
    //             "directions": true,
    //             "question": "How many tokens did Quereshi receive",
    //             "options": [
    //               "One",
    //               "Two",
    //               "Three",
    //               "Four"
    //             ],
    //             "marks": 4,
    //             "correctanswer": "Two",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Who among the following definitely received a token from Bhavya but not from Durga",
    //             "options": [
    //               "Quereshi",
    //               "Tamanna",
    //               "Pavitra Naresh",
    //               "Rashmika"
    //             ],
    //             "marks": 4,
    //             "correctanswer": "Pavitra Naresh",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "How many tokens did Chaitra award",
    //             "options": [
    //               "One",
    //               "Two",
    //               "Three",
    //               "Four"
    //             ],
    //             "marks": 4,
    //             "correctanswer": "Three",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "How many tokens did Shreya receive",
    //             "options": [
    //               "One",
    //               "Two",
    //               "Three",
    //               "Four"
    //             ],
    //             "marks": 4,
    //             "correctanswer": "Three",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Which of the following could be the amount of funding that Tamanna received?(Y)Rs66000(Z)165000",
    //             "options": [
    //               "Neither (Y) nor (Z)",
    //               "Only (Y)",
    //               "Both (Y) and (Z)",
    //               "Only (Z)"
    //             ],
    //             "marks": 4,
    //             "correctanswer": "Both (Y) and (Z)",
                
    //           },
    //           {
    //             "question": "Five Colleagues U, V, W, X, and Y each bought a Necklace of a different price. U paid more than both Y and W. Only V paid more than X. W did not pay the minimum amount. W paid Rs 4000 for the Necklace.Who among the following paid the second-highest amount?",
    //             "options": [
    //               "V",
    //               "W",
    //               "X",
    //               "Y"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "W",
                
    //           },
    //           {
    //             "question": "Mr Sridhar Varma wants to go to the Poorna market. He moved northwards and after covering some distance turned left and moved 4 km and reached a crossing. The road in front of him led to RK Beach while the road on to her left led to MVP Colony and the road to his right led to the Poorna market. In which direction the Poorna market is located with reference to the starting point?",
    //             "options": [
    //               "West",
    //               "North-West",
    //               "South-West",
    //               "East"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "North-West",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Which of the following is false",
    //             "options": [
    //               "P is fourth to the right of T",
    //               "U is to the immediate right of R",
    //               "U is third to the right of S",
    //               "Q is to the immediate left of S"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "U is third to the right of S",
                
    //           },
    //           {
    //               "directions": true,
    //               "question": "Which of the following is true",
    //               "options": [
    //                 "R is fourth to the right of T",
    //                 "P is to the immediate right of V",
    //                 "S is second to the left of T",
    //                 "Q is second to the right of V"
    //               ],
    //               "marks": 0,
    //               "correctanswer": "P is to the immediate right of V",
                  
    //             },
    //           {
    //             "question": "If  HYDERABAD / VIZAG = 1.5 and AMARAVATI / VIZAG = 2.5, then AMARAVATI/KURNOOL=",
    //             "options": [
    //               "1.25",
    //               "1.67",
    //               "1",
    //               "1.50"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "1.67",
                
    //           },
    //           {
    //             "question": "In the recently conducted  West Godavari Premier League at Bhimavaram which happened from 01st April 2023 to 15th April, There was a batsman having an excellent average and was regarded as “Mr Kohli of West Godavari”. He was having 36 runs per innings as his average after the 15th innings. His average increased by 3 runs after the 16th innings. Then what was his score in the 16th inning",
    //             "options": [
    //               "84",
    //               "80",
    //               "86",
    //               "82"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "84",
                
    //           },
    //           {
    //             "question": "Three candidates A, B, and C participated in an election. A gets 25% of the votes more than B. C gets 10% more votes more than B. A also overtakes C by 1500 votes. If all 100% of voters voted and no invalid or illegal votes were cast, then what will be the number of voters on the voting list",
    //             "options": [
    //               "35500",
    //               "33500",
    //               "42500",
    //               "47500"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "33500",
                
    //           },
    //           {
    //             "question": "Who is the female student in the group",
    //             "options": [
    //               "M",
    //               "N",
    //               "O",
    //               "P"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "P",
    //             "directions": true
    //           },
    //           {
    //             "question": "What is the compulsory subject of O",
    //             "options": [
    //               "Geography",
    //               "Chemistry",
    //               "Physics",
    //               "English"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "Geography",
    //             "directions": true
    //           },
    //           {
    //             "directions": true,
    //             "question": "Which of the following have the same compulsory/optional set as that of R",
    //             "options": [
    //               "M",
    //               "N",
    //               "O",
    //               "None Of These"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "None Of These",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Disregarding which is compulsory and which is the optional subject, who has the same combination as that of R",
    //             "options": [
    //               "M",
    //               "N",
    //               "O",
    //               "Q"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "Q",
                
    //           },
    //           {
    //               "directions": true,
    //               "question": "Which of the following groups of students have Geography as their compulsory subject",
    //               "options": [
    //                 "M, O & P",
    //                 "O, N & P",
    //                 "O, P & R",
    //                 "M, N & O"
    //               ],
    //               "marks": 0,
    //               "correctanswer": "M, O & P",
                  
    //             },
          
    //           {
    //             "question": "The HCF of two numbers is 21 and their LCM is 4641. If one of the numbers is between 200 and 300, find the other number",
    //             "options": [
    //               "221",
    //               "273",
    //               "357",
    //               "441"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "357",
                
    //           },
    //           {
    //             "question": "Recently my sister and I played chess for Snickers chocolates. Whoever lost the game gave the other snicker chocolate. After the last game, we counted the snicker chocolates. I had 20 more Snickers chocolates than I started with, although he won 7 games. There is no draw. How many games did we play",
    //             "options": [
    //               "27",
    //               "34",
    //               "37",
    //               "54"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "34",
                
    //           },
    //           {
    //             "question": "English alphabets A to Z are numbered with the first 26 consecutive prime numbers.If PQR is 519 and UVW is 705; What is the value of MNO",
    //             "options": [
    //               "121",
    //               "363",
    //               "291",
    //               "242"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "363",
                
    //           },
    //           {
    //             "question": "What can be the maximum sum of Saturdays and Sundays in a normal year",
    //             "options": [
    //               "104",
    //               "105",
    //               "106",
    //               "107"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "105",
                
    //           },
    //           {
    //             "question": "In Vijayawada Bus station, There is a machine. It contains 1 rupee, 2 rupee and 5 rupee coins. The total number of coins is 300. The amount is Rs 960 if the number of 1 rupee coins and the number of 2 rupee coins are interchanged, the value comes down by Rs. 40. The total number of 5 rupee coins is",
    //             "options": [
    //               "104",
    //               "140",
    //               "60",
    //               "150"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "140",
                
    //           },
    //           {
    //             "question": "In certain code language 'PROMOTION' is written as 'QTR89', and 'DEMOTION' is written as ‘EG88’, How will you write  ‘LOCOMOTION’ ",
    //             "options": [
    //               "MPDP87",
    //               "MPDP90",
    //               "MQFS90",
    //               "MQFS87"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "MQFS90",
                
    //           },
    //           {
    //             "question": "There is a shopkeeper who is very wicked and wants to earn profit by hook or crook. He sells urad dal He contemplates about various methods. Which of the following would maximize his profit ?1.Sell Urad Dal at 10% profit.2. Use 900 g of weight instead of 1 kg.3. Mix 10% impurities in Urad Dal and selling Urad Dal at the cost price.4. Increase the price by 5% and reduce weights by 5%",
    //             "options": [
    //               "I or III",
    //               "II",
    //               "II, III and IV",
    //               "Profits are same"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "II",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Change in sales of company B from 2011 to 2012",
    //             "options": [
    //               "40%",
    //               "50%",
    //               "-40%",
    //               "-50%"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "-40%",
                
    //           },
    //           {
    //             "directions": true,
    //             "question": "Find the percent difference of sales of company A, B, and C combined in 2011 to company A, B, and C combined in 2010",
    //             "options": [
    //               "29%",
    //               "17%",
    //               "22%",
    //               "24%"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "17%",
                
    //           },
    //           {
    //             "question": "A bag contains 2 red, 3 green and 2 blue balls. Two balls are drawn at random. What is the probability that none of the balls drawn is blue",
    //             "options": [
    //               "10/21",
    //               "11/21",
    //               "2/7",
    //               "5/7"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "10/21",
                
    //           },
    //           {
    //             "question": "In how many different ways can the letters of the word 'DETAIL' be arranged in such a way that the vowels occupy only the odd positions",
    //             "options": [
    //               "36",
    //               "48",
    //               "60",
    //               "120"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "36",
                
    //           },
    //           {
    //             "question": "A, B, C and D purchased a restaurant for Rs. 56 lakhs. The contribution of B, C and D together is 460% that of A, alone. The contribution of A, C and D together is 366.66% that of B’s contribution and the contribution of C is 40% that of A, B and D together. The amount contributed by D is",
    //             "options": [
    //               "10lakhs",
    //               "12lakhs",
    //               "16lakhs",
    //               "18lakhs"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "18lakhs",
                
    //           },
    //           {
    //             "question": "In your college bus, One bus among all the buses has a peculiarity. The bus number plate. The bus number was a perfect square. It was also a perfect square when the plate was turned upside down. The bus company had only five hundred buses numbered from 1 to 500. What can be the number",
    //             "options": [
    //               "169",
    //               "36",
    //               "196",
    //               "CannotSay"
    //             ],
    //             "marks": 2,
    //             "correctanswer": "169",
                
    //           },
              

    //     ]

    //     Getquestion.insertMany(data).then(ans => res.send(ans)).catch(err =>res.send(err))
    // })


    app.get('/',(req,res)=>{
        res.render('test/home')
    })
    app.get('/login',(req,res)=>{
        if ( !req.user){
            return res.render('login')
        }else if (req.session.testStatus == "active"){
            return res.redirect('/questions')
        }else{
            return res.redirect('/starttest')
        }

    })
    app.get('/questionUpdate',async (req,res)=>{
        if (! req.user){
            return res.redirect('/')
        }
        const email = req.user.username
            results.findOne({emailId:email}).then((result)=>{
                // console.log(result)
                res.send(result)
            }).catch((err) => {
                res.send(err)
                
            })
        
    })
    
    app.post('/createQuestion',async (req,res)=>{
        

        const {directions, question,options,correctanswer,marks} = req.body

        const Data =  {question,options,correctanswer,marks}
        // console.log(Data)
        if (directions){
            Data.directions = directions
        }

        await Getquestion.create(Data).then(data=> res.send(data)).catch(err => res.send(err))

       
    })

    app.get('/starttest',user,async (req,res)=>{
        if (req.session.testStatus == "active"){
            return res.redirect('questions')
        }
        
        res.render('test/starttest')
    })

    app.post('/starttest',user,createCandidate().startTest)
    app.get('/questions',user,(req,res)=>{
        Getquestion.find({}).then((ques)=>{
            let ans = []
            ques.forEach((sol)=>{
                let obj = {_id:sol._id,
                    directions:sol.directions,
                    question:sol.question,
                    options:sol.options,
                    marks:sol.marks,
                    // correctanswer:sol.answer
                }
                ans.push(obj)
            })
            //It means that test Button has not been clicked---
            if (! req.session.testStatus){
                return res.redirect('/starttest')
            }
            // console.log(ans.length)
            
            results.findOne({emailId:req.user.username}).then((timer)=>{
                const time = 3600
                const endTime = new Date(timer.startTime.getTime() + time * 1000);
                // calculate the time remaining in minutes and seconds format
                const now = new Date();
                const diff = (endTime.getTime() - now.getTime()) / 1000; // convert to seconds
                const minutes = Math.floor(diff / 60);
                const seconds = Math.floor(diff % 60);

                // format the time remaining as a string in minutes and seconds format
                const timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} sec`;


                return res.render('test/index',{'question':JSON.stringify(ans),'timeRemaining':timeRemaining,'startTime':timer.startTime})

            }).catch(err => console.log(err))
            
        }).catch((err)=>{
            res.send(err)
        })
    })
    app.get('/register',(req,res)=>{
        res.render('register')
    })
    app.post('/register',createCandidate().registerCandidate)  //for registration---

    app.get('/login',(req,res)=>{
        res.render('login')
    })

    app.post('/login',passport.authenticate('local',{successRedirect:'/starttest',failureRedirect:'/login'}),()=>{});

    app.post('/updateMarks',createCandidate().updateMarks)

    app.get('/logout',(req,res)=>{
        req.session.destroy((err)=>{
            if (err){
                console.log(err)
            }else{
                res.redirect('/')
            }
        })

    })

    app.get('/downloadreport',createCandidate().downloadResult)

}
module.exports = quizRoute



