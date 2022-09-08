import Signin from './components/pages/auth/sign';
import Signup from './components/pages/auth/signup';
import Dashboard from './components/pages/dashboard/dashboard';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
firebase.initializeApp({
  apiKey: 'AIzaSyAxdpceHh8DdpbI88Cee65U2NyyA6wI4AM',
  authDomain: 'weathe-bot-pqbhfi.firebaseapp.com',
  databaseURL: 'https://weathe-bot-pqbhfi.firebaseio.com',
  projectId: 'weathe-bot-pqbhfi',
  storageBucket: 'weathe-bot-pqbhfi.appspot.com',
  messagingSenderId: '534742148714',
  appId: '1:534742148714:web:c606af9c041648e16b0c13',
});
// const db = initializeApp(firebaseConfig);
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact component={Signin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
