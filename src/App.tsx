import Registration from './components/Registration/Registration';
import Letter from './components/Letter/Letter';
import Office from './components/Office/Office';
import Safe from './components/Safe/Safe';
import Win from './components/Win/Win';
import My404Component from './components/My404Component/My404Component';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { RootState } from './store/store';
import { Redirect } from 'react-router';

import './App.css';

function App() {
  const name: string = useSelector( (state: RootState) => state.mainReducer.name)
  const sername: string = useSelector( (state: RootState) => state.mainReducer.sername)
  const school: string = useSelector( (state: RootState) => state.mainReducer.school)
  
  const Path = () => {
    if (!name || !sername || !school) return ( <Redirect to='/'/>)
    else return null
  }

  return (
    <div className="App">
      <Path/>
      <Switch>
        <Route exact path='/' component={Registration}/>
        <Route exact path='/Letter' component={Letter}/>
        <Route exact path='/OfficeOfPhisics' component={Office}/>
        <Route exact path='/Safe' component={Safe}/>
        <Route exact path='/youAREsuper' component={Win}/>
        <Route path='*' exact={true} component={My404Component} />
      </Switch>
    </div>
  );
}

export default App;
