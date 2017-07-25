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

class Home extends React.Component{ 
render(){
return(
    <MuiThemeProvider>
        <AppBar
        title="Real Time Parking App"
        iconElementLeft={<IconButton></IconButton>}
        iconElementRight={<span><FlatButton label="Register" onClick={()=>{
            this.props.history.push('/register')
        }}/><FlatButton label="Sign In" onClick={()=>{
            this.props.history.push('/signin')
        }}/></span>}
        />
    </MuiThemeProvider>
)}};

export default Home;