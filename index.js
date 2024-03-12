const express = require('express')
const app = express()
const port = 4000
const cors = require("cors")

// libs
var mysql = require('mysql');

app.use(cors())

app.get('/', (req, res) => {
  res.send('Forbidden!')
})

app.post('/v1/account/create', cors(), async (req, res) => {
  
  const data = {
    username: req.param('username'),
    password: req.param('password'),
    email: req.param('email'),
    pin: req.param('pin'),
    pic: req.param('pic'),
  }

  
  var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "heavenms"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "INSERT INTO `accounts` (`id`, `name`, `password`, `pin`, `pic`, `loggedin`, `lastlogin`, `createdat`, `birthday`, `banned`, `banreason`, `macs`, `nxCredit`, `maplePoint`, `nxPrepaid`, `characterslots`, `gender`, `tempban`, `greason`, `tos`, `sitelogged`, `webadmin`, `nick`, `mute`, `email`, `ip`, `rewardpoints`, `votepoints`, `hwid`, `language`) VALUES (NULL, '"+data.username+"', '"+data.password+"', '"+data.pin+"', '"+data.pic+"', '0', NULL, CURRENT_TIMESTAMP, '0000-00-00', '0', NULL, NULL, '30000', '30000', '30000', '10', '10', '0000-00-00 00:00:00.000000', '0', '1', NULL, '0', '"+data.username+"', '0', '"+data.email+"', NULL, '0', '0', '', '2')";
    con.query(sql, function (err, result) {
      if (err) {
        console.log(err)
        res.send(JSON.stringify({status:false, error: err.code}))
        return;
        //console.log(err)
        //res.send(JSON.stringify({status:err}))
      } 
      con.destroy();
      
      res.send(JSON.stringify({status:true, id: result.insertId}))
      //res.send(JSON.stringify({status:result}))
    });
  });

  //res.send(JSON.stringify({status:false}))

})

app.post('/v1/account/check', (req, res) => {
  res.send('TODO!')
})

app.get('/v1/account/update/pwd', (req, res) => {
  res.send('TODO!')
})

app.get('/v1/account/maple/activate', (req, res) => {
  res.send('TODO!')
})


app.listen(port, () => {
  console.log(`API app listening on port ${port}`)
})