import { getCoffeeStores } from "@/lib/coffee-stores"

const fetchCoffeeStores = async (req, res) => {
    const { latLong, limit } = req.query
    
    try {
        const response = await getCoffeeStores(latLong, limit)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json('Ops! Something went wrong.')
    }
}

export default fetchCoffeeStores
