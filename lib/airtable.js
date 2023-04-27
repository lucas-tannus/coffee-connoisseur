const airtable = require('airtable')

airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
})

const base = airtable.base(process.env.AIRTABLE_BASE_KEY)

export const coffeeStoresTable = base('coffee-stores')

export const getMinifiedRecords = (records) => records.map(({ id, fields }) => ({ recordId: id, ...fields }))

export const getRecordById = async (id, table) => {
    const response = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage()

    return getMinifiedRecords(response)
}
