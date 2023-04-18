import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import cls from 'classnames'
import { fetchCoffeeStores } from '@/lib/coffee-stores'

import styles from '../../styles/coffee-store.module.css'

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores()
    const params = staticProps.params

    return {
        props: {
            coffeeStore: coffeeStores.find(coffeeStore => coffeeStore.fsq_id.toString() === params.id)
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map(coffeeStore => ({
        params: {
            id: coffeeStore.fsq_id.toString()
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
    console.log(props.coffeeStore)
    const { name, location, imgUrl } = props.coffeeStore

    return (
        <div className={ styles.layout }>        
            <div className={ styles.container } >
                <div className={ styles.col1 }>
                    <div className={ styles.backToHomeLink }>
                        <Link href="/">Back to home</Link>
                    </div>
                    <div className={ styles.nameWrapper }>
                        <h2 className={ styles.name }>{ name }</h2>
                    </div>
                    <div className={ styles.storeImgWrapper }>
                        <Image
                            src={ imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" }
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
                        <p className={ styles.text }>{ location.formatted_address }</p>
                    </div>
                    {/* <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={ styles.text }>{ location.locality }</p>
                    </div> */}
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
