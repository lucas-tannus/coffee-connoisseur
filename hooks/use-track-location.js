import { useContext, useState } from "react"

import { ACTIONS_TYPES, StoreContext } from "@/contexts/store.context"

const useTrackLocation = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isFindingLocation, setIsFindingLocation] = useState(false)
    const { dispatch } = useContext(StoreContext)

    const success = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        dispatch({
            type: ACTIONS_TYPES.SET_LAT_LONG, 
            payload: {
                latLong: `${latitude},${longitude}`
            }
        })
        setErrorMessage('')
        setIsFindingLocation(false)
    }

    const error = () => {
        setErrorMessage('Unable to retrieve your location')
        setIsFindingLocation(false)
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true)

        if (!navigator.geolocation) {
            setErrorMessage('Geolocation is not supported by your browser')
            setIsFindingLocation(false)
        } else {            
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

    return {
        handleTrackLocation,
        errorMessage,
        isFindingLocation
    }
}

export default useTrackLocation
