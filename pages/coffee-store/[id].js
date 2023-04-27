import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import cls from 'classnames'
import { getCoffeeStores } from '@/lib/coffee-stores'
import { StoreContext } from '@/contexts/store.context'

import useSWR from 'swr'

import { isEmpty } from '@/utils'

import styles from '../../styles/coffee-store.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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

const CoffeeStore = (props) => {
    const router = useRouter()

    const id = router.query.id
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore)
    const [votingCount, setVotingCount] = useState(0)

    const { state: { coffeeStores } } = useContext(StoreContext)

    const { data } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

    useEffect(() => {
        if (data && data.length > 0) {
            const [coffeeStore] = data
            setCoffeeStore(coffeeStore)
            setVotingCount(coffeeStore.voting)
        }
    }, [data])

    useEffect(() => {
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id
                })
                setCoffeeStore(findCoffeeStoreById)
                handleCreateCoffeeStore(findCoffeeStoreById)
            }
        } else {
            handleCreateCoffeeStore(props.coffeeStore)
        }
    }, [id, props, props.coffeeStore, coffeeStores])

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const handleUpvoteButton = async () => {
        try {
            const coffeeStore = await fetch('/api/favouriteCoffeeStoreById', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if (coffeeStore && coffeeStore.length > 0) {
                setVotingCount(votingCount + 1)
            }
        } catch (error) {
            console.error('Error creating coffee store', error)
        }
    }

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, address, imgUrl } = coffeeStore

            await fetch('/api/createCoffeeStore', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    address: address || ''
                })
            })
        } catch (error) {
            console.error('Error creating coffee store', error)
        }
    }   

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
                        <Image src="/static/icons/places.svg" width="24" height="24" alt="address" />
                        <p className={ styles.text }>{ address }</p>
                    </div>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/star.svg" width="24" height="24" alt="star" />
                        <p className={ styles.text }>{ votingCount }</p>
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
