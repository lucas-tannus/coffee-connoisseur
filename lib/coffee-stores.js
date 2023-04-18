const getCoffeeStoreUrl = (latLong, query, limit) => (
    `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`
)


export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_KEY
        }
      };
      
      const response = await fetch(getCoffeeStoreUrl('-18.957169,-48.297492', 'coffee', 6), options)
      const data = await response.json()

      return data.results
}
