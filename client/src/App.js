import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Recipe from './components/Recipe';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <h1 className="title">Henry Food</h1>
      <Switch>
        <Route exact path='/home/:id' component={Details} />
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/recipe' component={Recipe} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
