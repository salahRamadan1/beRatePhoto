const { model , Schema } = require('mongoose')
const schema = new Schema({
first_name:{
    require:true,
    type:String
},
last_name:{
    require:true,
    type:String
},
email:{
    require:true,
    type:String
},
emailConfirm:{
   type:Boolean,
    default:false
},
password:{
    require:true , 
    type:String
},
age:{
    require:true , 
    type:Number
},
profile_Pic:{
    type:String,
    default:'https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg'
}
},{timestamps:true})
schema.post("init", function (doc) {
    doc.profile_Pic = "http://localhost:3000/" + doc.profile_Pic;
    
  });

module.exports = model('User' , schema)