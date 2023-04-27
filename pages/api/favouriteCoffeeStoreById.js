import { coffeeStoresTable, getRecordById, getMinifiedRecords } from '../../lib/airtable'

const favouriteCoffeeStoreById = async (req, res) => {

    if (req.method === 'PUT') {
        try {
            const { id } = req.body 
        
            if (!id) {
                return res.status(400).json({ message: 'missing id' })
            }
        
            const response = await getRecordById(id, coffeeStoresTable)
        
            if (!response) {
                return res.status(404).json({ message: 'coffee store not found' })
            }
            const [{ recordId, voting }] = response

            const updatedCoffeeStore = await coffeeStoresTable.update([
                {
                    id: recordId,
                    fields: {
                        voting: parseInt(voting) + 1
                    }
                }
            ])

            res.json(getMinifiedRecords(updatedCoffeeStore))
        } catch (error) {
            return res.status(500).json({ message: 'something went wrong updating coffee store' })
        }
    }
}

export default favouriteCoffeeStoreById
