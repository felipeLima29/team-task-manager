import styles from './StatCard.module.css';

export default function Card({ tittle, description }) {

    return (

        <div className={styles.card}>

            <h3 className={styles.tittle}>{tittle}</h3>

            <p>{description}</p>

        </div>

    )
}