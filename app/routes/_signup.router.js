// ```
// _person.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _person.js may be freely distributed under the MIT license
// ```

// */app/routes/_person.router.js*

// ## Person API object

// HTTP Verb  Route                 Description

// GET        /api/person             Get all of the person items
// GET        /api/person/:person_id    Get a single person item by person item id
// POST       /api/person             Create a single person item
// DELETE     /api/person/:person_id    Delete a single person item
// PUT        /api/person/:person_id    Update a person item with new info

// Load the person model
import Person from '../models/signup.model';

export default (app, router) => {

  // ### Person API Routes

  // Define routes for the person item API

  router.route('/signup')

    // ### Create a person item

    // Accessed at POST http://localhost:8080/api/person

    // Create a person item
    .post((req, res) => {

      Person.create({

        username : req.body.username,
        password : req.body.password

      }, (err, person) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Person created: ${person}`);

        Person.find((err, persons) => {
          if(err)
            res.send(err);

          res.json(persons);
        });
      });
    })

    // ### Get all of the person items

    // Accessed at GET http://localhost:8080/api/person
    .get((req, res) => {

      // Use mongoose to get all person items in the database
      Person.find((err, person) => {

        if(err)
          res.send(err);

        else
          res.json(person);
      });
    });

  router.route('/signup/:person_id')

    // ### Get a person item by ID

    // Accessed at GET http://localhost:8080/api/person/:person_id
    .get((req, res) => {

      // Use mongoose to a single person item by id in the database
      Person.findOne(req.params.person_id, (err, person) => {

        if(err)
          res.send(err);

        else
          res.json(person);
      });
    })

    // ### Update a person item by ID

    // Accessed at PUT http://localhost:8080/api/person/:person_id
    .put((req, res) => {

      // use our person model to find the person item we want
      Person.findOne({

        '_id' : req.params.person_id

      }, (err, person) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.username)
          person.username = req.body.username;
        if (req.body.password)
          person.password = req.body.password;

        // save the person item
        return person.save((err) => {

          if (err)
            res.send(err);

          return res.send(person);

        });
      });
    })

    // ### Delete a person item by ID

    // Accessed at DELETE http://localhost:8080/api/person/:person_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete person with id: ${req.params.person_id}`);

      Person.remove({

        _id : req.params.person_id
      }, (err, person) => {

        if(err)
          res.send(err);

        console.log('Person successfully deleted!');

        Person.find((err, persons) => {
          if(err)
            res.send(err);

          res.json(persons);
        });
      });
    });
};
