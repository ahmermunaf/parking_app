import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import React from 'react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import * as firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import ParkingDetails from './parkingDetails.js'
const style = {
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class Locations extends React.Component{
    constructor(props) {
    super(props);
    this.render.bind(this);
    this.componentDidMount.bind(this);
    this.state = {
        open: false,
        FirstName : '',
        parkings : [],
        keys:[],
    };
  }
handleToggle = () => this.setState({open: !this.state.open});
componentDidMount(){
firebase.database().ref('users').child('user'+firebase.auth().currentUser.uid).once('value').then(snap=>{
    this.setState({
        FirstName : snap.val().FirstName
    })
   
})
firebase.database().ref().child('parking').on('value',snap=>{
var allParking = snap.val()
var parkings = []
var keys = []
for(let a in allParking){
    keys.push(a)
    parkings.push(allParking[a])
}
this.setState({
    parkings:parkings,
    keys:keys,
})
})
}
    render(){
        return(
            <MuiThemeProvider>
                <div>
                    <Drawer open={this.state.open}>
                    <MenuItem onTouchTap={this.handleToggle}>Close</MenuItem>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <AppBar
                    title="Real Time Parking App"
                    onLeftIconButtonTouchTap={
                      this.handleToggle  
                    }
                    iconElementRight={<span><span><b>Welcome {this.state.FirstName}</b></span><IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        >
                                        <MenuItem primaryText="Sign out" onClick={()=>{
                                            firebase.auth().signOut()
                                            this.props.history.push('/')
                                            }
                                        }/>
                                        </IconMenu></span>}
                    />
                    <Paper style={style} zDepth={3} children={
                    <span>
                        <h2>Parking Locations</h2>
                    </span>} />
                    <div>
                        {
                                <Paper style={style} zDepth={3} children={
                                this.state.parkings.map((parking,ind)=>(
                                    <div>
                                        <h4>Location : {parking.Location}</h4>
                                        <h4>Total Number Of Slots : {parking.Slots}</h4>
                                        <Link
                                        to={{
                                            pathname:'/parkingDetails',
                                            state: {key: this.state.keys[ind]}
                                        }
                                        }
                                        ><RaisedButton label="View" primary={true} /></Link>
                                    </div>
                            ))
                                    } />
                        }
                    </div>
                    
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Locations