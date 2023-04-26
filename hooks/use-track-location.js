import { useState } from "react"

const useTrackLocation = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [latLong, setLatLong] = useState('')
    const [isFindingLocation, setIsFindingLocation] = useState(false)

    const success = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLatLong(`${latitude},${longitude}`)
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
        latLong,
        errorMessage,
        isFindingLocation
    }
}

export default useTrackLocation
