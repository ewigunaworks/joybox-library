const axios = require('axios')
const moment = require('moment')

const newBookArr = []
async function getBookListByAttribute(params) {
  console.log(params)
  let query = {}
  if(params.details) query['details'] = params.details
  if(params.offset) query['offset'] = params.offset
  if(params.limit) query['limit'] = params.limit
  
  const url = `https://openlibrary.org/subjects/${params.subject}.json`
  const books = await axios.get(url, {params: query})
  
  const data = []
  for(const book of books.data.works) {
    let authors = []
    for await (const author of book.authors) {
      const authorDt = {
        name: author.name
      }

      authors.push(authorDt)
    }
    const bookData = {
      title: book['title'],
      authors: authors,
      genre: books.data.name,
      editionNumber: book['cover_id'],
    }

    data.push(bookData)
  }

  return data;
}

async function submitPickupSchedule(params) {
  let result = {
    success: false,
    status: '',
    message: '',
    data: []
  }
  try {
    const pickupSchedule = moment(params['pickupSchedule']).format('YYYY-MM-DD HH:mm:ss')
  
    const bookData = {
      title: params['title'],
      authors: params['authors'],
      genre: params['genre'],
      editionNumber: params['editionNumber'],
      pickupSchedule: pickupSchedule,
    }
  
    // check if already registered pickup schedule
    newBookArr.find((book) => {
      console.log(book)
      if(book.editionNumber == bookData.editionNumber) {
        console.log(true)
        result = {
          success: false,
          status: 500,
          message: `Pickup schedule with book ${bookData.title} and edition number ${bookData.editionNumber} already submitted`,
          data: []
        }
        throw result
      }
    })
  
    newBookArr.push(bookData)
    result = {
      success: true,
      status: 200,
      message: `Submit pickup schedule success.`,
      data: newBookArr
    }
    return result
  } catch (error) {
    result = {
      success: false,
      status: 500,
      message: error.message,
      data: []
    }
    throw result
  }
}

module.exports = {
  getBookListByAttribute,
  submitPickupSchedule
}