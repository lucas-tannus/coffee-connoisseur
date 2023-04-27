import { useContext, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner/banner'
import Card from '@/components/card/card'

import { getCoffeeStores } from '@/lib/coffee-stores'
import { ACTIONS_TYPES, StoreContext } from '@/contexts/store.context'

import useTrackLocation from '../hooks/use-track-location'

export async function getStaticProps() {
    const coffeeStores = await getCoffeeStores()

    return {
        props: {
            coffeeStores
        }
    }
}

export default function Home(props) {
    const { handleTrackLocation, errorMessage, isFindingLocation } = useTrackLocation()
    const { dispatch, state: { coffeeStores, latLong } } = useContext(StoreContext)

    useEffect(() => {
        const setCoffeeStoresByLocation = async () => {  
            const result = await fetch(`api/getCoffeeStores?latLong=${latLong}&limit=18`)
            const coffeeStores = await result.json()
            dispatch({
                type: ACTIONS_TYPES.SET_COFFEE_STORES,
                payload: {
                    coffeeStores
                }
            })
        }

        setCoffeeStoresByLocation()
    }, [latLong])

    const handleButtonClick = () => {
        handleTrackLocation()
    }

    return (
        <div className={ styles.container }>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta name="description" content="ZTM project in order to learn the first steps of Next.js development" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={ styles.main }>
                <Banner handleButtonClick={ handleButtonClick } buttonText={isFindingLocation ? "Locating..." : "View stores nearby"} />
                { errorMessage && <p>Something went wrong: {errorMessage}</p> }
                <div className={ styles.heroImage }>
                    <Image src="/static/hero-image.png" width={800} height={400} alt="hero-image" />
                </div>
                <div className={ styles.sectionWrapper }>
                    { coffeeStores.length > 0 && (
                        <>
                            <h2 className={ styles.heading2 }>Stores near me</h2>
                            <div className={ styles.cardLayout }>
                                { coffeeStores.map(store => (
                                    <Card key={ store.id } { ...store } className={ styles.card } />
                                )) }
                            </div>
                        </>
                    ) }
                </div>
                <div className={ styles.sectionWrapper }>
                    { props.coffeeStores.length > 0 && (
                        <>
                            <h2 className={ styles.heading2 }>Udi stores</h2>
                            <div className={ styles.cardLayout }>
                                { props.coffeeStores.map(store => (
                                    <Card key={ store.id } { ...store } className={ styles.card } />
                                )) }
                            </div>
                        </>
                    ) }
                </div>
            </main>
        </div>
    )
}
