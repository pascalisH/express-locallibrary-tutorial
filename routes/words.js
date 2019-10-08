var express = require('express');
var router = express.Router();

var fs = require('fs'); //file system module
var data = fs.readFileSync('./api/words.json');
var words =JSON.parse(data);
//console.log(words);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/add/:word/:score', function(req, res) { 
  var data = req.params;
  var w = data.word;
  var s = Number(data.score);
  words[w] = s;
  var data = JSON.stringify(words, null,2);
  fs.writeFile('./api/words.json', data, finished);
  function finished(err){
    console.log('all set');
    var reply={
      status: "success",
      word: w,
      score: s
    }
    res.send(reply);
  }
  });

  router.get('/all', function(req, res) { 
    res.send(words);	
  });

module.exports = router;
