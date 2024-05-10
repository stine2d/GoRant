import express from "express";	


const app = express();
const port = 3000;

//to make the stylesheet accessible to all views
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", {blogpostsAll});
  });

let blogpostsAll = [];

//route to render form for new post
app.get("/new", (req, res) =>{
  res.render("new.ejs");
})

function Blogpost (author, title, content){
  this.author = author;
  this.title = title;
  this.content = content;
}

//route for submissions of new blogpost form
app.post("/new", (req, res) =>{
    console.log("Blogpost received");
    blogpostsAll.push(new Blogpost(req.body["author"], req.body["title"], req.body["content"]));
    console.log(blogpostsAll);
    res.redirect("/");
}); 

//route to render post for reading
app.get("/read/:id", (req, res)=>{
  const id = req.params.id;
  const post = blogpostsAll[id];
  res.render("read.ejs", {post, id});
});

//route to render the form to edit a blogpost
app.get("/edit/:id", (req, res)=>{
  console.log("we in the edit")
  const id = req.params.id;
  console.log(id);
  const post = blogpostsAll[id]; //id should be the index of post in array
  console.log("this is the post btw")
  console.log(post);
  res.render("edit.ejs", {post, id});
});

//route to handle submission of edited blogpost form
app.post("/edit/:id", (req, res) =>{
  console.log("post edit")
  console.log(req.body)
  const id = req.params.id;
  const {author, title, content} = req.body;
  blogpostsAll[id] = {author, title, content};
  res.redirect("/");
});


//route to delete a post from reading
app.post("/read/:id", (req, res) =>{
  const id= req.params.id;
  blogpostsAll.splice(id, 1);
  console.log("The post has been successfully deleted");
});

//route to delete a post from editing
app.post("/delete/:id", (req, res) =>{
  const id= req.params.id;
  blogpostsAll.splice(id, 1);
  console.log("The post has been successfully deleted");
  res.redirect("/");
})


//route to bring you back to homepage from reading
app.get("/read", (req, res)=>{
  res.redirect("/");
})

//route to bring you back to homepage from new
app.get("/new", (req, res)=>{
  res.redirect("/");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


