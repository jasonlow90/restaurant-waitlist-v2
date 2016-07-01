var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// Create the CustomerSchema.
var UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },

 });

 // Let's craft how our JSON object should look!
 // http://mongoosejs.com/docs/api.html#document_Document-toObject
 UserSchema.set('toJSON', {
     transform: function(doc, ret, options) {
         var returnJson = {
             id: ret._id,
             username: ret.name,
             email: ret.email,
         };
         return returnJson;
     }
 });


 // Let's encrypt our passwords using only the model!
 // This is a hook, a function that runs just before you save.
 UserSchema.pre('save', function(next) {
     var user = this;

     // only hash the name if it has been modified (or is new)
     if (!user.isModified('password')) return next();

     // just for example purposes, let's keep the agent's name in a separate field
    //  user.unencryptedName = agent.name;
     // bcrypt can come up with a salt for us (just pass it a number)
     user.password = bcrypt.hashSync(user.password, 10);

     next();
 });

 UserSchema.methods.authenticate = function(candidatePassword, callback){
   //invoke bcrypt to attempt to compare our user with the stored user pasword
   bcrypt.compare(candidatePassword, this.password, callback);
 };

module.exports = mongoose.model('User', UserSchema);
