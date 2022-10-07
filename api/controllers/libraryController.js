'use strict';
var libraryService = require('../services/libraryService');

async function booksList(req, res) {
  const query = req.query
  const bookLists = await libraryService.getBookListByAttribute(query)

  let result = {}
  if(bookLists.length > 0) {
    result['success'] = true
    result['status'] = 200
    result['message'] = 'Get data books by subject/genre success.'
    result['data'] = bookLists
  } else {
    result['success'] = failed
    result['status'] = 404
    result['message'] = 'Get data books by subject/genre failed.'
    result['data'] = []
  }
  
  return res.json(result)
}

async function submitPickupSchedule(req, res) {
  const params = req.body
  console.log(req);
  console.log(params)
  const submitPickupSchedule = await libraryService.submitPickupSchedule(params)

  return res.send(submitPickupSchedule)
}

module.exports = {
  booksList,
  submitPickupSchedule
}