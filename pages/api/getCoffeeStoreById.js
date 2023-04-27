import { coffeeStoresTable, getRecordById } from "@/lib/airtable"


const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query

    if (!id) {
        return res.status(400).json({ message: 'missing id' })
    }

    try {
        const coffeeStore = await getRecordById(id, coffeeStoresTable)
    
        if (coffeeStore.length > 0) {
            return res.json(coffeeStore)
        }

        return res.json(404).coffeeStore({ message: 'coffee store not found' })
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong finding coffee store' })
    }
}

export default getCoffeeStoreById
