import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as firebase from 'firebase' 
import Home from './components/home.js'
import Signin from './components/signin.js'
import Register from './components/register.js'
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AdminAddLocation from './components/adminAddLocation';
import Locations from './components/locations';
import ParkingDetails from './components/parkingDetails';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
var config = {
    apiKey: "AIzaSyA794xIRhhN86zp48Y58wh1e_swtOVcO5g",
    authDomain: "parking-app-61ca1.firebaseapp.com",
    databaseURL: "https://parking-app-61ca1.firebaseio.com",
    projectId: "parking-app-61ca1",
    storageBucket: "",
    messagingSenderId: "177967733241"
  };
  firebase.initializeApp(config);

ReactDOM.render(
<Router>
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/adminAddLocation" component={AdminAddLocation} />
        <Route path="/locations" component={Locations} />
        <Route path="/parkingDetails" component={ParkingDetails} /> 
    </div>
</Router>
    , document.getElementById('root'));
