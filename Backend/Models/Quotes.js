const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuotesSchema = new Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   content:{
    type: String,
    require: true,
   },
   auther:{
    type: String,
    require: true,
   },
   date:{
      type: Date,
      default: Date.now
   },
   likes:{
      type: Number,
      default:0
   },
   dislikes:{
      type: Number,
      default:0
   },
   likedBy: [
      {
         type: mongoose.Schema.Types.ObjectId   ,
         ref: 'user'
      }
   ],
   dislikedBy: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
      }
   ]
  });
  const Quotes = mongoose.model('quotes', QuotesSchema);
  module.exports = Quotes;