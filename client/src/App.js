import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Recipe from './components/Recipe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <h1>Henry Food</h1>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/recipe' component={Recipe} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
