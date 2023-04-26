import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import cls from 'classnames'
import { getCoffeeStores } from '@/lib/coffee-stores'
import { StoreContext } from '@/contexts/store.context'

import { isEmpty } from '@/utils'

import styles from '../../styles/coffee-store.module.css'

export async function getStaticProps(staticProps) {
    const params = staticProps.params
    const coffeeStores = await getCoffeeStores()
    const coffeeStore = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === params.id)

    return {
        props: {
            coffeeStore: coffeeStore ? coffeeStore : {}
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await getCoffeeStores()
    const paths = coffeeStores.map(coffeeStore => ({
        params: {
            id: coffeeStore.id.toString()
        }
    }))

    return {
        paths,
        fallback: true
    }
}

const handleUpvoteButton = () => {
    console.log('handle up vote')
}

const CoffeeStore = (props) => {
    const router = useRouter()
    
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const id = router.query.id
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore)

    const { state: { coffeeStores } } = useContext(StoreContext)

    useEffect(() => {
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id
                })
                setCoffeeStore(findCoffeeStoreById)
            }
        }
    }, [id])

    const { name, address, imgUrl } = coffeeStore

    return (
        <div className={ styles.layout }>        
            <div className={ styles.container } >
                <div className={ styles.col1 }>
                    <div className={ styles.backToHomeLink }>
                        <Link href="/">← Back to home</Link>
                    </div>
                    <div className={ styles.nameWrapper }>
                        <h2 className={ styles.name }>{ name }</h2>
                    </div>
                    <div className={ styles.storeImgWrapper }>
                        <Image
                            src={ imgUrl }
                            width={ 600 }
                            height={ 360 }
                            className={ styles.storeImg }
                            alt={ name }
                        />
                    </div>
                </div>
                <div className={ cls("glass", styles.col2) }>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/places.svg" width="24" height="24" />
                        <p className={ styles.text }>{ address }</p>
                    </div>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={ styles.text }>1</p>
                    </div>
                    <button className={ styles.upvoteButton } onClick={ handleUpvoteButton }>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStore
