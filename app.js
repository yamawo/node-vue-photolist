const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('photo.db');


/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  
  next();
});

 
/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(process.env.PORT ||3000, ()=>{
    console.log("Node.js is listening to PORT:" + server.address().port);
});


// 写真リストを取得するAPI
app.get("/api/photo/list", function(req, res){
     db.all("select * from photo",(err,results)=>{
        if(err)throw err;
        res.json(results)
    })
    
});

app.post("/api/photo/list", (req, res)=>{
    db.serialize(()=>{
        const stmt = db.prepare("INSERT INTO photo VALUES (?,?,?,?)");
        stmt.run(req.body.id,req.body.name,req.body.description,req.body.imgUrl);
        stmt.finalize();
        db.all("select * from photo",(err,results)=>{
            if(err)throw err;
            res.json(results)
        })

    })
});

app.delete("/api/photo/list",(req, res)=>{
    db.serialize(()=>{
        const stmt = db.prepare("DELETE FROM photo WHERE id=? or name=? or description=? or imgUrl=?");
        stmt.run(req.query.id,req.query.name,req.query.description,req.query.imgUrl);
        stmt.finalize();
        db.all("select * from photo",(err,results)=>{
            if(err)throw err;
            res.json(results)
        })
    })
})

app.use(express.static(__dirname + "/static/"));

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/static/index.html");
});
