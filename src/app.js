const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require(__dirname + "../../date.js");

const port = 8000;
const app = express();

app.set('view engine', 'ejs');

const staticPath = path.join(__dirname, '../public')
// console.log(staticPath);
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({ extended: true }));
const items = ["Buy food", "Cook food", "Eat food"];
const workitems = [];
const homelist = [];

app.get("/", (req, res) => {
   
    const day = date.getDate();
    res.render('index', { title: day, newlistitem: items });

});
app.post("/", (req, res) => {
//  console.log(req.body)
    const item = req.body.keyitem; 
      
    if (req.body.list === "work") {
        workitems.push(item);
        res.redirect("/work");
    }
    else if (req.body.list === 'Home'){
        homelist.push(item);
        res.redirect('/home');
    }
    else {
        items.push(item);
        res.redirect("/");
    }

})

app.get('/work', (req, res) => {
    res.render('index', {title: "work list", newlistitem: workitems});
});


app.get('/home', (req,res)=> {
    res.render("index", {title:'Home list', newlistitem : homelist});
})












app.listen(port, () => {
    console.log(`Server is live on port no.${port}`);
})