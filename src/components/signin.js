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
import * as firebase from 'firebase';
const style = {
  height: 350,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class Signin extends React.Component{
    constructor(){
         super();
    this.render.bind(this);
    this.state={
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
            }} /><FlatButton label="Register" onClick={()=>{
            this.props.history.push('/register')
            }} /></span>}
        />
        <Paper style={style} zDepth={3} children={
        <span>
            <h2>Sign In</h2>
            <TextField floatingLabelText="Email Address" onChange={e => this.setState({ Email: e.target.value })} />
            <br />
            <TextField floatingLabelText="Password" type="password" onChange={e => this.setState({ Password: e.target.value })}/>
            <br/>
            <RaisedButton label="Sign In" primary={true} onClick={()=>{
                const promise = firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password);
                promise.catch(e => this.setState({data : e.message}));
                promise.then(() =>{
                    this.props.history.push('/locations')
                })
                }}/>
                <h3>{this.state.data}</h3>
        </span>
        } />
        </div>
        </MuiThemeProvider>
        )
    }
}
export default Signin