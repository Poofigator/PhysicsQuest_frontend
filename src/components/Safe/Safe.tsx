import Header from '../Header/Header'
import styles from './Safe.module.css'
import safe from '../../Images/safe3.png'
import earth from '../../Images/safeEarth.svg'
import cube from '../../Images/safeCube.svg'
import water from '../../Images/safeWater.svg'
import backArrow from '../../Images/arrow-back.svg'

import { useState } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

import useSound from 'use-sound'
import WrongSound from './Wrong.mp3'
import RightSound from './Right.mp3'

const Safe = () => {
    const name: string = useSelector( (state: RootState) => state.mainReducer.name)
    const sername: string = useSelector( (state: RootState) => state.mainReducer.sername)
    const school: string = useSelector( (state: RootState) => state.mainReducer.school)

    const [winRedirect, setWinRedirect] = useState(false)
    const [officeRedirect, setOfficeRedirect] = useState(false)

    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [firstLock, setFirstLock] = useState<boolean|null>(null)
    const [secondLock, setSecondLock] = useState<boolean|null>(null)
    const [thirdLock, setThirdLock] = useState<boolean|null>(null)

    const [playWrongSound] = useSound(WrongSound)
    const [playRightSound] = useSound(RightSound)

    const playAudio = (good: boolean) => {
        if (good){
            playRightSound()}
        else{
            playWrongSound()}
    }
    function MainButtonFunc() {
        sendAnswer()
        setTimeout(ClearFields, 500)
    }
    function ClearFields() {
        setFirst('')
        setSecond('')
        setThird('')
        setFirstLock(null)
        setSecondLock(null)
        setThirdLock(null)
    }

    async function sendAnswer(){
        const url = 'https://physics-quest-backend.herokuapp.com/api/sendCode';
        const data = { name: name,
        sername: sername,
        school: school,
        answers: [first, second, third] };
        try {
          const response = await fetch(url, {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
              headers: {
              'Content-Type': 'application/json'
              }
          });
          const json = await response.json();
          console.log('Успех:', JSON.stringify(json));
          if (response.status === 202) {playAudio(true); setWinRedirect(true);}
          else {
              playAudio(false) 
              if (json.includes("1_замок_открылся")) setFirstLock(true);
              else setFirstLock(false);
              if (json.includes("2_замок_открылся")) setSecondLock(true);
              else setSecondLock(false);
              if (json.includes("3_замок_открылся")) setThirdLock(true);
              else setThirdLock(false);
              }
          } catch (error) {
          console.error('Ошибка:', error); alert('Ошибка на стороне сервера (500)')}
      }
      
    return(
        <div>
            { winRedirect ? (<Redirect push to="/youAREsuper"/>) : null }
            { officeRedirect ? (<Redirect push to="/OfficeOfPhisics"/>) : null }
            <Header infoCode={3}/>
            <div className={styles.wrapper}>
                <img className={styles.safe} src={safe} alt={'закрытый сейф'}/>
                <div className={styles.safeInside}>
                    <div className={styles.bulbs}>
                        <div className={(firstLock  === null) ? styles.commonLight : (firstLock) ? styles.greenLight : styles.redLight}/>
                        <div className={(secondLock  === null) ? styles.commonLight : (secondLock) ? styles.greenLight : styles.redLight}/>
                        <div className={(thirdLock  === null) ? styles.commonLight : (thirdLock) ? styles.greenLight : styles.redLight}/>
                    </div>
                    <div className={styles.fields}>
                        <img src={earth} alt='Иконка глобуса'/>
                        <input placeholder="" value={first} onChange={(event) => setFirst(event.target.value)}/>
                        <img src={cube} alt='Иконка куба'/>
                        <input placeholder="" value={second} onChange={(event) => setSecond(event.target.value)}/>
                        <img src={water} alt='Иконка воды'/>
                        <input placeholder="" value={third} onChange={(event) => setThird(event.target.value)}/>
                    </div>
                    <button className={styles.mainButton} onClick={MainButtonFunc}/>
                    <button className={styles.backButton} onClick={() => setOfficeRedirect(true)}>
                        <img className={styles.infoimg} src={backArrow} alt='log_out button'/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Safe