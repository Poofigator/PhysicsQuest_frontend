import sheet1 from '../../Images/Sheet1.jpg'
import sheet2 from '../../Images/Sheet2.jpg'
import sheet3 from '../../Images/Sheet3.jpg'
import sheet4 from '../../Images/Sheet4.jpg'
import sheet5 from '../../Images/Sheet5.jpg'
import sheet6 from '../../Images/Sheet6.jpg'
import table from '../../Images/table.jpg'
import sideArrow from '../../Images/arrow_navigation_direction_icon.svg'

import styles from './Letter.module.css'
import Header from '../Header/Header'
import { useState } from 'react'
import { Redirect } from 'react-router'


const Letter = () => {
    const [OfficeRedirect, setOfficeRedirect] = useState(false)
    const [sheet, setSheet] = useState(sheet1)
    function turn_over() {
        switch (sheet){
            case sheet1:
                setSheet(sheet2)
                break;
            case sheet2:
                setSheet(sheet3)
                break;
            case sheet3:
                setSheet(sheet4)
                break;
            case sheet4:
                setSheet(sheet5)
                break;
            case sheet5:
                setSheet(sheet6)
                break;
            case sheet6:
                setSheet(sheet1)
                break;
            default:
                break;
        }
    }
    async function sendAnswer(url: string, data: any){
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
          if (response.status === 202) setOfficeRedirect(true);
          } catch (error) {
          console.error('Ошибка:', error);}
      }
    return (
        <div>
            { OfficeRedirect ? (<Redirect push to="/OfficeOfPhisics"/>) : null }
            <Header infoCode={1} sendAnswer={sendAnswer}/>
            <div className={styles.Letter}>
                <img src={table} className={styles.Table} alt="Фон стола"/>    
                <img src={sheet} className={styles.Sheet} alt="Изображение письма"/>
                <button className={styles.side} onClick={turn_over}>
                    <img className={styles.sideimg} src={sideArrow} alt='info button'/>
                </button>
            </div>        
        </div>
    );
}

export default Letter;