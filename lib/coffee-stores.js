import { createApi } from 'unsplash-js'

const configuration = {
    fqs: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_KEY
        }
    }
}

const clients = {
  unsplash: createApi({
    accessKey: process.env.UNSPLASH_KEY
  })
}

const getCoffeeStoreUrl = (latLong, query, limit) => (
    `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`
)

const fetchCoffeeStoresPhotos = async () => {
    const { response } = await clients.unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30
    })
    return response.results.map(({ urls }) => urls['small'])
}

const fetchCoffeeStoresInfo = async () => {
    const response = await fetch(getCoffeeStoreUrl('-18.957169,-48.297492', 'coffee', 6), configuration.fqs)
    const data = await response.json()
    return data.results
}

export const getCoffeeStores = async () => {
    const coffeeStorePhotos = await fetchCoffeeStoresPhotos()
    const coffeeStoreInfo = await fetchCoffeeStoresInfo()

    return coffeeStoreInfo.map((coffeeStore, idx) => ({
        id: coffeeStore.fsq_id,
        name: coffeeStore.name,
        address: coffeeStore.location.formatted_address,
        imgUrl: coffeeStorePhotos[idx]
    }))
}
