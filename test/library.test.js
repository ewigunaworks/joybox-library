const library = require('../api/services/libraryService')

describe("Library test", () => {
  test('submit pickup schedule should return an object', async () => {
    const params = {
      title: "Adventures of Huckleberry Finn",
      authors: [
          {
              name: "Mark Twain"
          }
      ],
      genre: "History",
      editionNumber: 8157718,
      pickupSchedule: "2022-10-12 10:00:00"
    }

    const result = {
      success: true,
      status: 200,
      message: "Submit pickup schedule success.",
      data: [
        {
          title: "Adventures of Huckleberry Finn",
          authors: [
              {
                  name: "Mark Twain"
              }
          ],
          genre: "History",
          editionNumber: 8157718,
          pickupSchedule: "2022-10-12 10:00:00"
        }
      ]
    }
    await expect(library.submitPickupSchedule(params)).resolves.toMatchSnapshot(result)
  })

  test('submit pickup schedule another book should return an object', async () => {
    const params = {
      title: "Little Women",
      authors: [
          {
              "name": "Louisa May Alcott"
          }
      ],
      genre: "History",
      editionNumber: 6795866,
      pickupSchedule: "2022-10-12 11:00:00"
    }

    const result = {
      success: true,
      status: 200,
      message: "Submit pickup schedule success.",
      data: [
        {
          title: "Adventures of Huckleberry Finn",
          authors: [
              {
                  name: "Mark Twain"
              }
          ],
          genre: "History",
          editionNumber: 8157718,
          pickupSchedule: "2022-10-12 10:00:00"
        },
        {
          title: "Little Women",
          authors: [
              {
                  "name": "Louisa May Alcott"
              }
          ],
          genre: "History",
          editionNumber: 6795866,
          pickupSchedule: "2022-10-12 11:00:00"
        }
      ]
    }
    await expect(library.submitPickupSchedule(params)).resolves.toMatchSnapshot(result)
  })

  test('submit pickup schedule with same edition number should return an object with error', async () => {
    const params = {
      title: "Adventures of Huckleberry Finn",
      authors: [
          {
              name: "Mark Twain"
          }
      ],
      genre: "History",
      editionNumber: 8157718,
      pickupSchedule: "2022-10-12 10:00:00"
    }

    const result = {
      success: false,
      status: 500,
      message: `Pickup schedule with book ${params.title} and edition number ${params.editionNumber} already submitted`,
      data: []
    }
    await expect(library.submitPickupSchedule(params)).rejects.toEqual(result)
  })
})