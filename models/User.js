// import 
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: 'Email address is required!',
      unique: true,
      // can use match or validation to confirm it is a valid email address. Validation calls a function you would write while match
      // specifies a validatino regex directly. Decided to go with match here: 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    // This would 'use the UserSchema to validate data for friends'
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    // Need the toJSON property if mongoose is going to use virtuals 18.2.4 
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevent virtuals from creating duplicate of _id as 'id'. We set id to false because this is a virtual that Mongoose returns and we do not need it! 
    id: false
  });

// create a virtual called 'friendcount' that retrieves the length of the user's 'friends' array field on query. e.g. how many friends does this person have? 
// reduce method produces a single value. Good for getting the sum of all the elements in an array. syntax is reduce(previousValue, currentValue) => previousValue + currentValue, initialValue 
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length; 
});

// Creates the user model using this Schema 
const User = model('User', UserSchema);
// Export the User model 
module.exports = User; 