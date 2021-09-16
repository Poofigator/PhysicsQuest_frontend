import Header from "../Header/Header";
import OfficeIMG from '../../Images/Office.jpg'
import safe from '../../Images/safe1.png'
import styles from './Office.module.css'
import { Redirect } from "react-router";
import { useState } from "react";

const Office = () => {
    const [SafeRedirect, setSafeRedirect] = useState(false)
    return(
        <div>
            { SafeRedirect ? (<Redirect push to="/Safe"/>) : null }
            <Header infoCode={2}/>
            <div className={styles.Office}>
                <img className={styles.wrapperIMG} src={OfficeIMG} alt='кабинет физики'/>
                <button className={styles.geografic} onClick={() => alert('Представьте себе что вдоль всего экватора сквозь горы и поверх океанов проложеннна дорога.с какой скоростью надо двигаться по ней чтобы ровно за год(не високосный) совершить кругосветное путешествие? Длину экватора принять равной 40 000 км движение считать круглосуточным.(ответ округлите до десятых)')}></button>
                <button className={styles.water} onClick={() => alert('Ребята решили смастерить плот из брёвен плотностью 650 кг/м3 и объёмом 0,1 м3. В команду входит 10 человек. Сколько нужно брёвен, чтобы плот мог удержаться на плаву? Считать, что в среднем масса каждого человека 70 кг.')}></button>
                <button className={styles.cube} onClick={() => alert('Если бы в интернете появилось необычное объявление: недорого продаётся алмазный кубик массой 857,5 г (и размер, вроде бы, подходящий: площадь всей поверхности кубика 294 см2). Стоит ли покупать этот кубик? Найдите его плотность.')}></button>
                <button onClick={() => setSafeRedirect(true)}><img src={safe} alt='сейф' className={styles.safe}/></button>
            </div>
        </div>
    )
}

export default Office;