var express = require('express');
var router = express.Router();
const url = require('url')
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Userlist page. */
router.get('/about', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
 
  
  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "delete"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('about', { "userlist":data })
    
  });
});
router.get('/checklist',function(req,res,next){

 
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "none"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('checklist', { title: 'checklist',"userlist":data })
    
  });
})


router.all('/delete:id',function(req,res,next){
  var ObjectId = require('mongodb').ObjectID;
 var id = (req.params.id).replace(":", "");;
 //var myId = JSON.parse(req.body.id);
  var db = req.db;
  //var final = "ObjectId("+id+")"


  var collection = db.get('usercollection');
  //db.city.update({}, {$set: {"country":"Indonesia"}}, {multi:true})
  collection.update({_id:ObjectId(id)},{$set:{"status":"delete"}},{multi:false},function(e,docs){
   

    
  });
  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "none"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('checklist', { title: 'checklist',"userlist":data })
    
  });
})


router.all('/done:id',function(req,res,next){
  var ObjectId = require('mongodb').ObjectID;
 var id = (req.params.id).replace(":", "");;
 //var myId = JSON.parse(req.body.id);
  var db = req.db;
  //var final = "ObjectId("+id+")"


  var collection = db.get('usercollection');
  //db.city.update({}, {$set: {"country":"Indonesia"}}, {multi:true})
  collection.update({_id:ObjectId(id)},{$set:{"status":"done"}},{multi:false},function(e,docs){
   
 
    
  });
  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "none"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('checklist', { title: 'checklist',"userlist":data })
    
  });
})



router.all('/alldone',function(req,res,next){
 
  var db = req.db;
 
  var collection = db.get('usercollection');
  //db.city.update({}, {$set: {"country":"Indonesia"}}, {multi:true})
  collection.update({},{$set:{"status":"done"}},{multi:true},function(e,docs){

    
  });
  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "none"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('checklist', { title: 'checklist',"userlist":data })
    
  });
})



router.get('/done',function(req,res,next){
  var db = req.db;
  //var final = "ObjectId("+id+")"


  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    var data = [];
              for(let aa in docs){
                if((docs[aa]['status']) == "done"){
                  data.push(docs[aa])
                 
                }
              }
    res.render('done', { title: 'done',"userlist":data })
    
  });
  
})
router.all('/tasksubmit',function(req,res){
  
      var task = req.body.task;
      var db = req.db;
      if (task.length == 0) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
          var data = [];
          for(let aa in docs){
            if((docs[aa]['status']) == "none"){
              data.push(docs[aa])
             
            }
          }
       
          res.render('checklist', { title: 'checklist',"userlist":data })
          
        });
      }
      else{
        var today = new Date();
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        date = '(Created at:'+date+')';
       
      // Set our internal DB variable
      var db = req.db;
         // Set our collection
      var collection = db.get('usercollection');
  
      // Submit to the DB
      collection.insert({
          "task" : task,
          "date" : date,
           "status" : "none"
      }, function (err, doc) {
          if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
          }
          else {
              // And forward to success page
              var collection = db.get('usercollection');
              collection.find({},{},function(e,docs){
                var data = [];
                for(let aa in docs){
                  if((docs[aa]['status']) == "none"){
                    data.push(docs[aa])
                   
                  }
                }
             
                res.render('checklist', { title: 'checklist',"userlist":data })
                
              });
           
          }
      });
      }
    
 
     
    
       
      
  
      
})

module.exports = router;
