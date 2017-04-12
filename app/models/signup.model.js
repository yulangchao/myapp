// ```
// person.model.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// person.model.js may be freely distributed under the MIT license
// ```

// */app/models/person.model.js*

// ## Person Model

// Note: MongoDB will autogenerate an _id for each Person object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Person` object
let personSchema = new mongoose.Schema({
  username: { type : String, unique: true},
  password: { type : String}
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Person', personSchema);
