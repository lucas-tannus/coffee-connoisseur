import { createApi } from 'unsplash-js'

const configuration = {
    fqs: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_KEY
        }
    }
}

const clients = {
  unsplash: createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY
  })
}

const getCoffeeStoreUrl = (latLong, query, limit) => (
    `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`
)

const fetchCoffeeStoresPhotos = async (limit) => {
    const { response } = await clients.unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: limit
    })
    return response.results.map(({ urls }) => urls['small'])
}

const fetchCoffeeStoresInfo = async (latLong, limit) => {
    const response = await fetch(getCoffeeStoreUrl(latLong, 'coffee', limit), configuration.fqs)
    const data = await response.json()
    return data.results
}

export const getCoffeeStores = async (latLong = '-18.957169,-48.297492', limit = 6) => {
    const coffeeStorePhotos = await fetchCoffeeStoresPhotos(limit)
    const coffeeStoreInfo = await fetchCoffeeStoresInfo(latLong, limit)

    return coffeeStoreInfo.map((coffeeStore, idx) => ({
        id: coffeeStore.fsq_id,
        name: coffeeStore.name,
        address: coffeeStore.location.formatted_address,
        imgUrl: coffeeStorePhotos[idx]
    }))
}
