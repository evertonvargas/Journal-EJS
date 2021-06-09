const express = require("express");
const content = require(__dirname + "/content.js")
const _ = require('lodash');
const port = 3000;
const app = express();
const posts = []

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("home", {homeContent: content.homeStartingContent, postsContent: posts})
});

app.get("/about", (req, res) => {
  res.render("about", {aboutContent: content.aboutContent})
});

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: content.contactContent})
});

app.get("/compose", (req, res) => {
  res.render("compose")
});

app.get("/posts/:postName", (req,res) =>{
  for(const post of posts){
    if(_.lowerCase(post.title) ==_.lowerCase(req.params.postName)){
      res.render("post", {title: post.title, content: post.content})
    }
  }
})

app.post("/", (req, res)=>{
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
