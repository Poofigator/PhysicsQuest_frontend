import Header from '../Header/Header'
import styles from './Win.module.css'
import safe from '../../Images/safe2.png'

import Rick from './Gifs/DanceScientist.gif'
import Scientist from './Gifs/Scientist.gif'
import Firework from './Gifs/Firework.gif'
import Hearts from './Gifs/Hearts.gif'

import useSound from 'use-sound'
import Music from './WinMusic.mp3'
import { useEffect } from 'react'

const Win = () => {
    const [playMusic] = useSound(Music)
    useEffect(() => {playMusic()});
    return(
        <div>
            <Header infoCode={4} status={true}/>
            <div className={styles.gifs}>
                <img className={styles.rick} src={Rick} alt="loading..." />
                <img className={styles.scientist} src={Scientist} alt="loading..." />
                <img className={styles.firework1} src={Firework} alt="loading..." />
                <img className={styles.firework2} src={Firework} alt="loading..." />
                <img className={styles.heart} src={Hearts} alt="loading..." />
            </div>
            <div className={styles.wrapper}>
                <img className={styles.safe} src={safe} alt={'закрытый сейф'}/>
            </div>
        </div>
    )
}
export default Win