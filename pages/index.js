import { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner/banner'
import Card from '@/components/card/card'

import { getCoffeeStores } from '@/lib/coffee-stores'

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
    const { handleTrackLocation, latLong, errorMessage, isFindingLocation } = useTrackLocation()

    useEffect(() => {
        const setCoffeeStoresByLocation = async () => {
            const result = await getCoffeeStores(latLong, 20)
            console.log(result)
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
                    <Image src="/static/hero-image.png" width={800} height={400} alt="" />
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
