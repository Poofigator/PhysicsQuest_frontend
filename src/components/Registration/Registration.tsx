import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REGISTRATION } from '../../store/actions/regAction';
import styles from './Registration.module.css'
import { Redirect } from 'react-router';

const Registration = () => {
    const dispatch = useDispatch()

    function reg() {
        dispatch({ type: REGISTRATION,
        payload:[name, sername, school]})
        localStorage.setItem('userName', name);
        localStorage.setItem('userSername', sername);
        localStorage.setItem('userSchool', school);
        setRedirect(true)
    }

    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState('')
    const [sername, setSername] = useState('')
    const [school, setSchool] = useState('')
    
    async function postData(){
        if (!name || !sername || !school) return (null)
        else{
        const url = 'https://physics-quest-backend.herokuapp.com/api/sendRegData';
        const data = { name: name,
        sername: sername,
        school: school };

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
        if (response.status === 200) reg(); // сохраняем имя, фамилию, школу в состояние
        } catch (e) {
        console.error('Ошибка:', e);}
        }
    }

    return (
        <div className={styles.wrapper}>
            { redirect ? (<Redirect push to="/Letter"/>) : null }
            <div className={styles.Form}>
                <p>Регистрация</p>
                <input className={styles.field} placeholder="Имя" value={name} onChange={(event) => setName(event.target.value)}/>
                <input className={styles.field} placeholder="Фамилия" value={sername} onChange={(event) => setSername(event.target.value)}/>
                <input className={styles.field} placeholder="Школа" value={school} onChange={(event) => setSchool(event.target.value)}/>
                <button className={styles.submit} onClick={postData}>Зарегистрироваться</button>
            </div>
        </div>
    );
}

export default Registration;