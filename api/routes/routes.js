'use strict';
module.exports = function(app) {
  var library = require('../controllers/libraryController');

  // todoList Routes
  app.route('/library')
    .get(library.booksList)
  
  app.route('/library/submit')
    .post(library.submitPickupSchedule)
};