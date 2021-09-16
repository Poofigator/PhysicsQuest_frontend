import styles from './Header.module.css'
import info from '../../Images/info-solid.svg'
import log_out from '../../Images/log_out.svg'

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../store/store';
import { LOG_OUT } from '../../store/actions/logOut';

import getPDF from '../diploms/getPDF'

const Header = (props: any) => {
  const name: string = useSelector( (state: RootState) => state.mainReducer.name)
  const sername: string = useSelector( (state: RootState) => state.mainReducer.sername)
  const school: string = useSelector( (state: RootState) => state.mainReducer.school)

  const dispatch = useDispatch()
  const [number, setNumber] = useState<string|null>(null)

  const url = 'https://physics-quest-backend.herokuapp.com/api/sendTest';
  const data = { name: name,
  sername: sername,
  school: school,
  answers: number };
  
  useEffect(() => {(props.sendAnswer !== undefined) ? props.sendAnswer(url, data) : console.log('')});
  
  function infoButton() {
    switch (props.infoCode) {
      case 1:
        setNumber(prompt('Это кнопка является подсказкой нажимайте сюда почаще\n\nВ письме говорилось о какой-то школе, думаю стоит её посетить.\nПоле для ввода номера школы'))
        break;
      case 2:
        alert('Осмотритесь, может получится что-нибудь найти')
        break;
      case 3:
        alert('Должно быть задачи из кабинета как-то связаны с кодом от сейфа')
        break;
      case 4:
        alert('Молодец, ты смог заполучить кубок юного физика!!!\n\nОбрати внимание теперь тебе доступна грамота для скачивания ;)')
        break;
      default:
        alert('Что ты от меня хочешь шайтанама')
    }
  }
  let textOfHeader = (document.documentElement.clientWidth > 767) ? name + ' ' + sername + ' ' + school : name
  return (
    <header className={styles.wrapper}>
      <div className={styles.account}>{textOfHeader}</div>
      <button className={styles.sertificate} onClick={() => getPDF(name, sername, school)}>
        {props.status ? 'Грамота' : 'Сертификат'}
      </button>
      <button className={styles.info} onClick={infoButton}>
        <img className={styles.infoimg} src={info} alt='info button'/>
      </button>
      <button className={styles.info} onClick={() => window.confirm('Ты уверен, что хочешь покинуть игру?') ? dispatch({ type: LOG_OUT}) : null}>
        <img className={styles.infoimg} src={log_out} alt='log_out button'/>
      </button>
    </header>
  );
}

export default Header;