var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var timeD = this.date_of_death;
  var timeB = this.date_of_birth;
  if (timeD===undefined || timeD===null)
    timeD = '..';
  else
    timeD = moment(timeD).format('YYYY');
  if (timeB===undefined || timeB===null)
    timeB = '..'; 
  else
    timeB = moment(timeB).format('YYYY'); 
  return timeB +' - ' + timeD;
});

// Virtual for author's day of birth
AuthorSchema
.virtual('birthday')
.get(function () {
  var timeB = this.date_of_birth;
  if (timeB===undefined || timeB===null)
    timeB = '..'; 
  else
    timeB = moment(timeB).format('YYYY-MM-DD');   
  return timeB;
});

// Virtual for author's day of death
AuthorSchema
.virtual('memorial')
.get(function () {
  var timeB = this.date_of_death;
  if (timeB===undefined || timeB===null)
    timeB = '..'; 
  else
    timeB = moment(timeB).format('YYYY-MM-DD');   
  return timeB;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);