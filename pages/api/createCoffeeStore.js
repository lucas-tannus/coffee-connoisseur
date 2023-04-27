import { coffeeStoresTable, getMinifiedRecords } from '../../lib/airtable'

const createCoffeStore = async (req, res) => {

    if (req.method === 'POST') {
        const { id, name, address, imgUrl, voting } = req.body

        const coffeeStore = await coffeeStoresTable.select({
            filterByFormula: `id="${id}"`
        }).firstPage()

        if (coffeeStore.length > 0) {
            return res.json(getMinifiedRecords(coffeeStore))
        }

        try {
            if (!id || !name) {
                return res.status(400).json({ message: 'id and name are required' })
            }

            const createdCoffeeStore = await coffeeStoresTable.create([
                {
                    fields: {
                        id,
                        name,
                        address,
                        imgUrl,
                        voting    
                    }
                }   
            ])
            return res.json(getMinifiedRecords(createdCoffeeStore))
        } catch (error) {
            return res.status(500).json({ message: 'something went wrong creating coffee store' })
        }
    }
}

export default createCoffeStore
