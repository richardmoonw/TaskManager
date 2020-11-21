import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './my_account/Login';
import SignUp from './my_account/Signup';

const App = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
        </Switch>
    )
}


export default App;