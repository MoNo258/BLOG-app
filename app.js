var express = require('express'),
    app = express(),
    // request = require('request'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3003;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.set("view engine","ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog for db",
//     image: "https://images.unsplash.com/photo-1538353231715-6f25a966a2ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
//     body: "This is blog about nothing, just testing",
// });

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log(err)
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new",function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        console.log(newBlog);
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            res.redirect("/");
        } else {
            res.render("show", {blog: blog});
        }
    });
});

app.listen(port, function(){
    console.log("It is ok");
});