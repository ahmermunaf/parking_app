import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import * as firebase from 'firebase';
const style = {
  height: 450,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class Register extends React.Component{
    constructor(){
         super();
    this.render.bind(this);
    this.state={
    FirstName : '',
    LastName : '',
    Email : '',
    Password : '',
    data : '',
}
     }
    render(){
        return(
            <MuiThemeProvider>
        <div>
        <AppBar
        title="Real Time Parking App"
        iconElementLeft={<IconButton></IconButton>}
        iconElementRight={<span><FlatButton label="Home" onClick={()=>{
            this.props.history.push('/')
            }} /><FlatButton label="Sign In" onClick={()=>{
            this.props.history.push('/signin')
            }} /></span>}
        />
        <Paper style={style} zDepth={3} children={
            <span>
        <h2>Register</h2>
        <TextField
        floatingLabelText="First Name"
        onChange={e => this.setState({ FirstName: e.target.value })}
        /><br />
        <TextField
        floatingLabelText="Last Name"
        onChange={e => this.setState({ LastName: e.target.value })}
        /><br />
        <TextField
        floatingLabelText="Email Address"
        onChange={e => this.setState({ Email: e.target.value })}
        /><br />
        <TextField 
        floatingLabelText="Password"
        type="password"
        onChange={e => this.setState({ Password: e.target.value })}
         /><br/>
        <RaisedButton label="Register" primary={true} onClick={()=>{
        const promise = firebase.auth().createUserWithEmailAndPassword(this.state.Email,this.state.Password);
        promise.catch(e => this.setState({data : e.message}));
        promise.then(() =>{
        const uid = firebase.auth().currentUser.uid
        firebase.database().ref('users').child('user'+uid).update({
        FirstName : this.state.FirstName,
        LastName : this.state.LastName,
        Email : this.state.Email,
        Password : this.state.Password,
        uid:uid,
        })
        this.props.history.push('/signin')
        })
            }} />
        <h3>{this.state.data}</h3>
        </span>
        } />
        </div>
    </MuiThemeProvider>
        )
    }
}
export default Register