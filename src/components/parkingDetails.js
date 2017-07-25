import {
  BrowserRouter as Router,
  Route,
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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import * as firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import TimePicker from 'material-ui/TimePicker';
const style = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const minDate = new Date();
const currentTime = minDate.getTime()
class ParkingDetails extends React.Component{
    constructor(props) {
    super(props);
    this.render.bind(this);
    this.state = {
        open: false,
        slots : '',
        arrs:[],
        location:'',
        expanded: false,
        slotNo : '',
        minDate: minDate,
        controlledDate: null, 
        time: null,
        error : '',
        givenHour : '',
    };

console.log(this.props.location.state.key);
  }
  handleChangeTimePicker12 = (event, date) => {
    this.setState({time: date});
  };

handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };
 handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };
handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };
handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };
handleExpand = () => {
    this.setState({expanded: true});
  };
handleReduce = () => {
    this.setState({expanded: false});
  };

handleToggles = () => this.setState({open: !this.state.open});
componentDidMount(){
firebase.database().ref('parking').child(this.props.location.state.key).on('value',snap=>{
this.setState({
    slots : snap.val().Slots,
    location : snap.val().Location
})
var count = this.state.slots
count = Number(count)
var arrs = []
for(var i = 1;i<=count;i++){
arrs.push({a:'slot'+i})
}
this.setState({arrs:arrs})
})
}
    render(){        
        return(
            <MuiThemeProvider>
                <div>
                    <Drawer open={this.state.open}>
                    <MenuItem onTouchTap={this.handleToggles}>Close</MenuItem>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <AppBar
                    title="Real Time Parking App"
                    onLeftIconButtonTouchTap={
                      this.handleToggles  
                    }
                    iconElementRight={<span><IconMenu
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
                    <div>
                        <Paper style={style} zDepth={3} children={
                            <div>
                                            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                                                <CardText expandable={true}>
                                                    <h4>Reserve Parking {this.state.slotNo}</h4>
                                                    <div>
                                                    <DatePicker
                                                    autoOk={this.state.autoOk}
                                                    floatingLabelText="Min Date"
                                                    defaultDate={this.state.minDate}
                                                    disableYearSelection={this.state.disableYearSelection}
                                                    value={this.state.controlledDate}
                                                    onChange={this.handleChange}
                                                    />
                                                    <TimePicker
                                                    format="ampm"
                                                    hintText="12hr Format"
                                                    value={this.state.time}
                                                    onChange={this.handleChangeTimePicker12}
                                                     />
                                                     <TextField floatingLabelText="Hours" type="number" min="1" onChange={e => this.setState({ givenHour: e.target.value })}/>
                                                    </div>

                                                    <RaisedButton label="Cancel" onTouchTap={this.handleReduce} />
                                                    <RaisedButton label="Add" primary={true} onTouchTap={()=>{
                                                        var milisecond = this.state.time.getMilliseconds()
                                                        var second = this.state.time.getSeconds()
                                                        var minute = this.state.time.getMinutes()
                                                        var hour = this.state.time.getHours()
                                                        var date = this.state.controlledDate.getDate()
                                                        var year = this.state.controlledDate.getFullYear()
                                                        var month = this.state.controlledDate.getMonth()
                                                        switch(month) { 
                                                            case 0 :
                                                            month='January';
                                                            break;
                                                            case 1 :
                                                            month='February';
                                                            break;
                                                            case 2 :
                                                            month='March';
                                                            break;
                                                            case 3 :
                                                            month='April';
                                                            break;
                                                            case 4 :
                                                            month='May';
                                                            break;
                                                            case 5 :
                                                            month='June';
                                                            break;
                                                            case 6 :
                                                            month='July';
                                                            break;
                                                            case 7 :
                                                            month='August';
                                                            break;
                                                            case 8 :
                                                            month='September';
                                                            break;
                                                            case 9 :
                                                            month='October';
                                                            break;
                                                            case 10 :
                                                            month='November';
                                                            break;
                                                            case 11 :
                                                            month='December';
                                                            break;
                                                        }
                                                        var userTimeObj = new Date(month + " " + date + ", "+ year + " " + hour + ":"+minute+":"+second+":" + milisecond);        
                                                        var userTime = userTimeObj.getTime()                                                
                                                        if(userTime<currentTime){
                                                            this.setState({error : 'Reservation time can not be past time', })
                                                        }
                                                        }}/>
                                                        <h2>{this.state.error}</h2>
                                                </CardText>
                                            </Card>
                            <div>
                                {console.log(this.state.time,this.state.controlledDate)}
                                <h2>{this.state.location}</h2>
                                <h4>Number Of Parking Slots {this.state.slots}</h4>
                            </div>
                            {
                                this.state.arrs.map((arr,ind)=>(
                                    <span>
                                        <span>
                                        <RaisedButton label={arr.a} primary={true} key={ind} onTouchTap={()=>{
                                            this.setState({slotNo:arr.a})
                                            this.handleExpand()
                                            }} />
                                        </span>
                                    </span>
                            ))
                                    }
                            </div>
                                    } />
                        
                    </div>
                </div>
        </MuiThemeProvider>
            )     
        }
    }
export default ParkingDetails