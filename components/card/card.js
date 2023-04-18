import cls from 'classnames'

import Link from 'next/link'
import Image from 'next/image'

import styles from './card.module.css'

const Card = ({ fsq_id, name, imgUrl }) => (
    <Link className={ styles.cardLink } href={ `/coffee-store/${fsq_id}` }>
        <div className={ cls("glass", styles.container) }>
            <div className={ styles.cardHeaderWrapper }>
                <h2 className={ styles.cardHeader }>{ name }</h2>
            </div>
            <div className={ styles.cardImageWrapper }>
                <Image 
                    src={ imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" } 
                    alt={ name } 
                    width={260} 
                    height={160} 
                    className={ styles.cardImage } 
                />
            </div>
        </div>
    </Link>
)

export default Card
