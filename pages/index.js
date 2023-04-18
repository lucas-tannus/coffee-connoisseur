import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner/banner'
import Card from '@/components/card/card'

import { fetchCoffeeStores } from '@/lib/coffee-stores'

export async function getStaticProps() {
    const coffeeStores = await fetchCoffeeStores()

    return {
        props: {
            coffeeStores
        }
    }
}

export default function Home(props) {

  const handleButtonClick = () => {
    console.log('Banner button click has been handled!')
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
          <Banner handleButtonClick={ handleButtonClick } buttonText="View stores nearby" />
          <div className={ styles.heroImage }>
            <Image src="/static/hero-image.png" width={800} height={400} alt="" />
          </div>
          <div className={ styles.cardLayout }>
            { props.coffeeStores.map(store => (
              <Card key={ store.fsq_id } { ...store } className={ styles.card } />
            )) }
          </div>
      </main>
    </div>
  )
}
