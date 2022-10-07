'use strict';
var libraryService = require('../services/libraryService');

async function booksList(req, res) {
  const query = req.query
  const result = await libraryService.getBookListByAttribute(query)
  
  return res.json(result)
}

async function submitPickupSchedule(req, res) {
  const params = req.body
  const submitPickupSchedule = await libraryService.submitPickupSchedule(params)

  return res.send(submitPickupSchedule)
}

module.exports = {
  booksList,
  submitPickupSchedule
}