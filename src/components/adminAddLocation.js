import React from 'react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
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
  height: 400,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
class AdminAddLocation extends React.Component{
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
        className = 'AddField'
        floatingLabelText="Location"
        onChange={e => this.setState({ Location: e.target.value })}
        /><br />
        <TextField
        className = 'AddField'
        floatingLabelText="Slots"
        onChange={e => this.setState({ Slots: e.target.value })}
        /><br />
        <RaisedButton label="Add" primary={true} onClick={()=>{
        firebase.database().ref('parking').child(this.state.Location).update({
        Location : this.state.Location,
        Slots: this.state.Slots,
        })
        var fields = document.getElementsByClassName('AddField')
        for(var i = 0;i<fields.length;i++){
            fields[i].value = ''
        }
        }} />
        </span>
        } />
        </div>
        </MuiThemeProvider>
        )
    }
}
export default AdminAddLocation