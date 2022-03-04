import './App.css';
import './styles/bitskins.css';
import NavBar from './components/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import CS from './components/cs';
import React, { useEffect, useState } from 'react';
import LoginForm from './components/login';
import Register from './components/register';
import ProtectedRoute from './components/common/propectedRoute';
import Auth from './services/authService';
import getAccountBalance from './services/bitskinsApi';

function App() {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState('');
  useEffect(() => {
    const user = Auth.getCurrentUser();
    setUser({ user });

    const getBalance = async () => {
      let balance = await getAccountBalance();
      setBalance(balance.available_balance);
    };
    getBalance();
  }, []);

  return (
    <React.Fragment>
      <NavBar user={user} balance={balance} />
      <main className="container">
        <Switch>
          <ProtectedRoute path="/cs" component={CS} />
        </Switch>
        <Switch>
          <Route path="/login" component={LoginForm} />
        </Switch>
        <Switch>
          <Route path="/register" component={Register} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
