import cls from 'classnames'

import Link from 'next/link'
import Image from 'next/image'

import styles from './card.module.css'

const Card = ({ id, name, imgUrl }) => (
    <Link className={ styles.cardLink } href={ `/coffee-store/${id}` }>
        <div className={ cls("glass", styles.container) }>
            <div className={ styles.cardHeaderWrapper }>
                <h2 className={ styles.cardHeader }>{ name }</h2>
            </div>
            <div className={ styles.cardImageWrapper }>
                <Image 
                    src={ imgUrl } 
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
