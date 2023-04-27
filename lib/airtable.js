const airtable = require('airtable')

airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
})

const base = airtable.base(process.env.AIRTABLE_BASE_KEY)

export const coffeeStoresTable = base('coffee-stores')

export const getMinifiedRecords = (records) => records.map(({ fields }) => ({ ...fields }))
