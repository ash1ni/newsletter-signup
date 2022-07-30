const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const path = require('path')
const { response } = require('express')
const app = express()


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.sendFile(__dirname +"/signup.html")
})
app.post("/",(req,res)=>{
    const firsName = req.body.fName 
    const lastName = req.body.lName 
    const email = req.body.Email 
    //console.log(firsName, lastName, email)
    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firsName,
                    LNAME: lastName

                }
            }
        ]
    };
    const jsonData = JSON.stringify(data)
    const url = "https://us18.api.mailchimp.com/3.0/lists/75ba2841af"
    const options = {
        method: "post",
        auth: "bismil1:f2260b8fb4468d0ffa006d6421800c18-us18"
    }

    const request = https.request(url, options, (response)=>{
      if(response.statusCode === 200){
        res.sendFile(__dirname+ "/success.html")
      }  else{
        res.sendFile(__dirname+"/faliure.html")
      }
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })

    })
    request.write(jsonData)
    request.end()

})

app.post("/faliure",(req,res)=>{
    res.redirect("/")
})






// api key
// f2260b8fb4468d0ffa006d6421800c18-us18
// https://<dc>.api.mailchimp.com/3.0/lists/75ba2841af
// id  75ba2841af


























app.listen(3000, ()=>{
    console.log("server is up and running on port 3000")
})