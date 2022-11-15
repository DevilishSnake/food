import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.homeDiv}>
            <h1 className={styles.homeDivTitle}>Food website</h1>
            <Link to='/home'>
                <button className={styles.homeButton}>Ingresar</button>
            </Link>
        </div>
    )
}