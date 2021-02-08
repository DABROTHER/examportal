import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DatePicker from 'react-date-picker';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../style/update.css';
import Radio from "@material-ui/core/Radio";
// import img from'../img/av
import avtar from '../img/avatar.svg';
import bg from '../img/bg.svg';
import wave from '../img/wave.png';
import Swal from 'sweetalert2';
import firebase from 'firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// const moment = require('moment');
 
const axios = require('axios')

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }},

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState();
//   const [value, onChange] = useState(new Date());
  const [showbox, setshowbox] = React.useState(false);
  const [gender, setGender] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState();
  const [country, setCountry] = React.useState('');
  const [hobbies, setHobbies] = React.useState([]);

  const [firstname, setFirstname] = React.useState([]);
  const [lastName, setLastName] = React.useState([]);
  const [email, setEmail] = React.useState([]);
  const [mobilenumber, setMobilenumber] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [pin, setPin] = React.useState([]);
  const [classxboard, setClassxboard] = React.useState([]);
  const [classxpercentage, setClassxpercentage] = React.useState([]);
  const [classxpassingyear, setClassxpassingyear] = React.useState([]);
  const [classxiiboard, setClassxiiboard] = React.useState([]);
  const [classxiipercentage, setClassxiipercentage] = React.useState([]);
  const [classxiipassingyear, setClassxiipassingyear] = React.useState([]);
  const [graduationboard, setGraduationboard] = React.useState([]);
  const [graduationpercentage, setGraduationpercentage] = React.useState([]);
  const [graduationpassingyear, setGraduationpassingyear] = React.useState([]);
  const [masterboard, setMasterboard] = React.useState([]);
  const [masterpercentage, setMasterpercentage] = React.useState([]);
  const [masterpassingyear, setMasterpassingyear] = React.useState([]);
  const [user, setUser] = React.useState();
  
//   const [lastName, LsetastName] = React.useState([]);

  const [error, setError] = React.useState({
      firstName:'',
      lastName:'',
      email:'',
      mobilenumber:'',
      city:'',
      pin:'',
      classxboard:'',
      classxpercentage:'',
      classxpassingyear:'',
      classxiiboard:'',
      classxiipercentage:'',
      classxiipassingyear:'',
      graduationboard:'',
      graduationpercentage:'',
      graduationpassingyear:'',
      masterboard:'',
      masterpercentage:'',
      masterpassingyear:'',

  });
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr){
          props.history.push(`/`)
        } else {
            console.log("success")
          setUser(_usr.email)
        }
    })
    // setTimeout(() => {
    //     firebase.auth().signOut()  
    // }, 60000);
  })

  const handleHobbiesChange = (event) =>{
console.log("hobbies",event.target.value)
// console.log("checked",event.target.checked)


if(event.target.checked){
    console.log("checked", event.target.value)
    hobbies.push(event.target.value)
}
else{
    console.log("unchecked",event.target.value)
    // var arr = ["orange","red","black","white"];
    // var index = arr.indexOf("red");
    // if (index >= 0) {
    //   arr.splice( index, 1 );
    // }
    var itemIndex= hobbies.indexOf(event.target.value);
    console.log("itemIndex",itemIndex)
    if(itemIndex>=0){
        hobbies.splice( itemIndex, 1 ); 
    }
//   console.log("hob",hobbies)
  console.log("hob",hobbies)
    
}
console.log("hobbbies",hobbies)
  }
  const showOtherBox = () =>{
      if(!showbox){
        document.getElementById("myDIV").style.display=""
        setshowbox(true)
      }
      else{
        document.getElementById("myDIV").style.display="none"
        setshowbox(false)
      }
    
    //   .style.display = "none";

  }
  const formRegistartion = (e) =>{
    e.preventDefault();
    // var nameRegex=[a-zA-Z]
    var getfirstName= document.getElementById("firstName").value;
    var getlasttName= document.getElementById("lasttName").value;
    // dob
    var getemail= document.getElementById("email").value;
    var getmobilenumber= document.getElementById("mobilenumber").value;
    var getcity= document.getElementById("city").value;
    var getpin= document.getElementById("pin").value;
    var getclassxboard= document.getElementById("classxboard").value;
    var getclassxpercentage= document.getElementById("classxpercentage").value;
    var getclassxpassingyear= document.getElementById("classxpassingyear").value;

    var getclassxiiboard= document.getElementById("classxiiboard").value;
    var getclassxiipercentage= document.getElementById("classxiipercentage").value;
    var getclassxiipassingyear= document.getElementById("classxiipassingyear").value;

    var getgraduationboard= document.getElementById("graduationboard").value;
    var getgraduationpercentage= document.getElementById("graduationpercentage").value;
    var getgraduationpassingyear= document.getElementById("graduationpassingyear").value;

    var getmasterboard= document.getElementById("masterboard").value;
    var getmasterpercentage= document.getElementById("masterpercentage").value;
    var getmasterpassingyear= document.getElementById("masterpassingyear").value;

  //   var fname= document.getElementById("fname").value;city
    // var fname= document.getElementById("fname").value;
  console.log("value",getfirstName, getlasttName, getemail, selectedDate, getmobilenumber, gender, getcity, getpin, country, hobbies, selectedValue )
  console.log("classx",getclassxboard, getclassxpercentage, getclassxpassingyear)
  console.log("classxii",getclassxiiboard, getclassxiipercentage, getclassxiipassingyear)
  console.log("gradu", getgraduationboard, getgraduationpercentage, getgraduationpassingyear  )
  console.log("master", getmasterboard, getmasterpercentage, getmasterpassingyear)
  console.log("error",firstname)
  if(firstname ||lastName || email || mobilenumber ||city ||pin || classxboard || classxpercentage || classxpassingyear || classxiiboard
    || classxiipercentage|| classxiipassingyear || graduationboard || graduationpercentage || graduationpassingyear || masterboard || masterpercentage || masterpassingyear 
    ){
    console.log("true")
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check your validation',
        // footer: '<a href>Why do I have this issue?</a>'
      })
  }
  else{
      if(getfirstName && getlasttName && getemail && selectedDate && getmobilenumber && gender && getcity && getpin && country && hobbies &&
         selectedValue && getclassxboard && getclassxpercentage && getclassxpassingyear && getclassxiiboard && getclassxiipercentage &&
          getclassxiipassingyear && getgraduationboard && getgraduationpercentage && getgraduationpassingyear && getmasterboard && getmasterpercentage && getmasterpassingyear){
console.log("all data")
var password           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i <6; i++ ) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
console.log("res",password)
firebase
.firestore()
.collection("deftregistration")
.doc(getemail)
.get().then((doc) => {
    if (doc.exists) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Already exist',
            // footer: '<a href>Why do I have this issue?</a>'
          })
        // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        if(password){
            firebase
                .firestore()
                .collection("deftregistration")
                .doc(getemail)
                .set({
                   firstname: getfirstName,
                   lastname:getlasttName,
                   password:password,
                   email:getemail,
                   DOB:selectedDate,
                   mobilenumber:getmobilenumber,
                   gender:gender,
                   city:getcity,
                   pin:getpin,
                   country:country,
                   hobbies:hobbies,
                   course:selectedValue,
                   classxboard:getclassxboard,
                   classxpercentage:getclassxpercentage,
                   classxpassingyear:getclassxpassingyear,
                   classxiiboard:getclassxiiboard,
                   classxiipercentage:getclassxiipercentage,
                   classxiipassingyear:getclassxiipassingyear,
                   graduationboard:getgraduationboard,
                   graduationpercentage:getgraduationpercentage,
                   graduationpassingyear:getgraduationpassingyear,
                   masterboard:getmasterboard,
                   masterpercentage:getmasterpercentage,
                   masterpassingyear:getmasterpassingyear,
                   approved:false
        
                })
                .then(res=>{
                    console.log("res",res)
                    const url =`To login, please click here: http://localhost:3000 and enter your email and password. Your credential are emai:${getemail}  , password: ${password}`;
                    axios.post(`https://axlewebtech.com/scripts/mailing/live_chat/mail.php?to=${getemail}&subject=Live Chat Agent Account Created&body=${url}`)
                  .then(res=>{
                      console.log("success",res); 
                      console.log("email",email)
                      setTimeout(() => {
                        firebase
                          .auth()
                          .createUserWithEmailAndPassword(getemail, password)
                
                      }, 5000)
                    })
                    .catch(err=>{
                        console.log("err",err);
                        console.log("email",email)
                    });
                    Swal.fire({
                        icon: 'succes',
                        title: 'We sent mail with login credential',
                        text: 'please check mail',
                        // footer: '<a href>Why do I have this issue?</a>'
                      })
                      .then(save=>{
                          window.location.reload()
                      })
                })
                .catch(err=>{
                    console.log("err",err)
                })
        }
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

      }
      else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill all Filed',
            // footer: '<a href>Why do I have this issue?</a>'
          })
      }
      
  }

//   console.log("value", firstName, lasttName, email, selectedDate, mobilenumber, gender, city, pin, country, hobbies, selectedValue )
//   console.log("value", pin, country, hobbies, selectedValue )
}
  const ValidationHandle = (event) =>{
    event.preventDefault();
    var nameRegex=/^[a-zA-Z ]{1,30}$/;
    var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var mobileRegex=/^[0-9]{10}$/
    var pinRegex=/^[0-9]{6}$/
    var boardRegex=/^[a-zA-Z ]{1,10}$/;
    var percentageRegex=/^[0-9]{1,2}$/;
    var passingyearRegex=/^[0-9]{4}$/;
    // var {fname, lName, email, value}= event.target
    // console.log("fname",fname)
    const { name, value } = event.target;
    console.log("name",name)
//    let errors = setError;
    // console.log("error",errors)
   switch (name) {
     case 'firstName': 
     console.log("firsname",value.match(nameRegex));
     setFirstname(value.match(nameRegex)? ''
        : 'max 30 characters a-z and A-Z')
    //    setError.firstName = 
    //    value.match(nameRegex)
    //        ? ''
    //        : 'Full Name must be at least 5 characters long!';
       break;
     case 'lastName': 
     console.log("lastname")
    //  setError({lastName: value.match(nameRegex)
    setLastName(value.match(nameRegex)
        ? ''
        : 'max 30 characters a-z and A-Z'
    )
       break;
     case 'email': 
    //  setError({email: value.match(emailRegex)
        setEmail( value.match(emailRegex)
        ? ''
        : 'Please enter correct email')
       break;
       case 'mobilenumber': 
       setMobilenumber(value.match(mobileRegex)
        ? ''
        : 'Mobile number should be 10 (0-9)')
       break;
       case 'city': 
       setCity(value.match(nameRegex)
        ? ''
        : 'max 30 characters a-z and A-Z')
       break;
       case 'pin': 
       setPin( value.match(pinRegex)
        ? ''
        : 'pin should be 6 (0-9)')
       break;
       case 'classxboard': 
       setClassxboard(value.match(boardRegex)
        ? ''
        : 'max 10 characters a-z and A-Z')
       break;
       case 'classxpercentage': 
       setClassxpercentage(value.match(percentageRegex)
        ? ''
        : 'max 2 digits 0-9')
       break;
       case 'classxpassingyear': 
       setClassxpassingyear(value.match(passingyearRegex)
          ? ''
          : 'Passing year should be 4 digits 0-9')
         break;
         case 'classxiiboard': 
         setClassxiiboard(value.match(boardRegex)
        ? ''
        : 'max 10 characters a-z and A-Z')
       break;
       case 'classxiipercentage': 
       setClassxiipercentage(value.match(percentageRegex)
        ? ''
        : 'max 2 digits 0-9')
        break;
        case 'classxiipassingyear': 
        setClassxiipassingyear(value.match(passingyearRegex)
          ? ''
          : 'Passing year should be 4 digits 0-9')
         break;
         case "graduationboard":
            setGraduationboard(value.match(boardRegex)
            ? ''
            : 'max 10 characters a-z and A-Z')
           break;
           case 'graduationpercentage': 
           setGraduationpercentage(value.match(percentageRegex)
        ? ''
        : 'max 2 digits 0-9')
        break;
        case 'graduationpassingyear': 
        setGraduationpassingyear(value.match(passingyearRegex)
           ? ''
           : 'Passing year should be 4 digits 0-9')
          break;
          case "masterboard":
            setMasterboard(value.match(boardRegex)
                ? ''
                : 'max 10 characters a-z and A-Z')
            break;
            case 'masterpercentage': 
            setMasterpercentage(value.match(percentageRegex)
            ? ''
            : 'max 2 digits 0-9')
            break;
            case 'masterpassingyear': 
            setMasterpassingyear(value.match(passingyearRegex)
           ? ''
           : 'Passing year should be 4 digits 0-9')
          break;
          default:
            break;
   }
   console.log("errors",firstname)
//    setError({[name]:value}) masterpassingyear
  }
  const handleCountryChange = (event) => {
    console.log("country",event.target.value)
    setCountry(event.target.value);
  };

  const handleCourseChange = (event) => {
    console.log("course",event.target.value)
    setSelectedValue(event.target.value);
  };
  const handleGenderChange = (event)=>{
      console.log("gender",event.target.value)
      setGender(event.target.value);
  }

//   const handleCourseChange = (event) => {
//     setValue(event.target.value);
//   };


  const handleDateChange = (date) => {
    console.log(date);
    var str = date;
  var res = String(str).substring(3, 16);
    console.log("res",res);
    setSelectedDate(res);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Logout = (e)=>{
    // e.preventDefault()
    console.log("logout")
    // localStorage.removeItem("deftToken");
    // props.history.push('/admin/login')
    firebase.auth().signOut()
  }
  const ChangePassword = () =>{
      props.history.push('/ChangePassword')
  }
  const Edit = () =>{
    props.history.push('/studentdashboard')
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{backgroundColor:"#3CAF87"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Logout',].map((text, index) => (
            <ListItem button onClick={Logout} title="Logout">
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Change password',].map((text, index) => (
            <ListItem button onClick={ChangePassword} title="Change password">
              <ListItemIcon><LockOpenIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Dashboard',].map((text, index) => (
            <ListItem button onClick={Edit} title="Dashboard">
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
     
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {/* <img className="wave" src={wave}/> */}
	<div className="container">
		{/* <div className="img">
			<img src={bg}/>
		</div> */}
		<div className="login-content">
			<form   onSubmit={formRegistartion}>
				{/* <img src={avtar}/> */}
				<h2 className="title">Update* (Only UI is done not backend) </h2>
           		{/* <div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		<input placeholder="Email" id="userID" type="text" className="input"/>
           		   </div>
           		</div> */}
            <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={ValidationHandle}
              
                // error={true}	
                // maxlength="3"
              />
              {console.log("error.firstName",firstname)}
               {firstname.length>0 && 
                <span className='error'>{firstname}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                autoComplete="fname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lasttName"
                label="Last Name"
                autoFocus
                onChange={ValidationHandle}
              />
                {/* {console.log("last",error)} */}
              {lastName&& 
                <span className='error'>{lastName}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="lname"
                onChange={ValidationHandle}
              />
              {/* {console.log("email",error)} */}
              {email&& 
                <span className='error'>{email}</span>}
            </Grid>
            </Grid>
            <br/>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
       
            <KeyboardDatePicker
          margin="normal"
          id="dob"
          label="Date of Birth"
          format="MM/dd/yyyy"
        //   selected='enterdate'
          value={selectedDate}
          required
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="mobilenumber"
                variant="outlined"
                required
                fullWidth
                type="number"
                id="mobilenumber"
                label="Mobile Number"
                autoFocus
                onChange={ValidationHandle}
              />
             {/* {console.log("email",error)} */}
              {mobilenumber&& 
                <span className='error'>{mobilenumber}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
            {/* <div> */}
            <div className="line">
            Gender:
      <Radio
        checked={gender === "male"}
        onChange={handleGenderChange}
        value="male"
        placeholder="male"
        name="radio-button-demo"
        inputProps={{ "aria-label": "female" }}
      />
      male
      
      <Radio
        checked={gender === "female"}
        onChange={handleGenderChange}
        value="female"
        name="radio-button-demo"
        inputProps={{ "aria-label": "female" }}
      />
      Female
            </div>
            </Grid>
            </Grid>
            {/* <Grid item xs={12}>
            <TextareaAutosize variant="outlined" className="inputcss" aria-label="minimum height" rowsMax={5} rowsMin={3} placeholder="Address" />
            </Grid> */}
            <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                autoFocus
                onChange={ValidationHandle}
              />
               {/* {console.log("error.firstName",error.city)} */}
               {city && 
                <span className='error'>{city}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="pin"
                variant="outlined"
                required
                fullWidth
                type="number"
                id="pin"
                label="Pin"
                autoFocus
                onChange={ValidationHandle}
                />
                {/* {console.log("error.firstName",error.pin)} */}
                {pin && 
                 <span className='error'>{pin}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
              <FormControl style={{width:"100%"}} variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={country}
          onChange={handleCountryChange}
          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="Afghanistan">Afghanistan</MenuItem>
          <MenuItem value="canada">Canada</MenuItem>
        </Select>
      </FormControl>
              </div>
            </Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={7}>
            <FormControl style={{marginTop:"2%"}} component="fieldset">
      {/* <FormLabel component="legend">Label Placement</FormLabel> */}
      <FormGroup aria-label="position" row>
        <p style={{marginTop:"2%", marginLeft:"-2%",}}>Hobbies:</p>
        <FormControlLabel
          value="Drawing"
          control={<Checkbox color="secondary" />}
          label="Drawing"
          labelPlacement="Drawing"
          onChange={handleHobbiesChange}
        />
        <FormControlLabel
          value="Singing"
          control={<Checkbox color="secondary" />}
          label="Singing "
          labelPlacement="Singing"
          onChange={handleHobbiesChange}
        />
        <FormControlLabel
          value="Dancing"
          control={<Checkbox color="secondary" />}
          label="Dancing "
          labelPlacement="Dancing"
          onChange={handleHobbiesChange}
        />
         {/* <FormControlLabel
          value="Other"
         
          control={<Checkbox color="secondary" />}
          label="Other "
          labelPlacement="Other"
          onChange={showOtherBox}
        />
        <input type="text" checked={true}  onChange={handleHobbiesChange} id="myDIV" style={{display:"none",width:"100%" , backgroundColor:"#FAFAFA"}}/>
      */}
      </FormGroup>
    </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
            <div style={{marginTop:"3%", marginLeft:"-10%"}}>
            Course: 
      <Radio
        checked={selectedValue === "B.tech / BE"}
        onChange={handleCourseChange}
        value="B.tech / BE"
        placeholder="male"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B.tech / BE" }}
      />
      B.tech / BE
      
      <Radio
        checked={selectedValue === "BCA"}
        onChange={handleCourseChange}
        value="BCA"
        name="radio-button-demo"
        inputProps={{ "aria-label": "BCA" }}
      />
      BCA
      <Radio
        checked={selectedValue === "B.Com"}
        onChange={handleCourseChange}
        value="B.Com"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B.Com" }}
      />
      B.Com
            </div>
            </Grid>
            
            </Grid>
            <Grid item xs={12}>
              <div>
              {/* <h2>HTML Table</h2> */}

<table>
  <tr>
    <th>Sl.No.	Examination	
    </th>
    <th>Board* (only text)
        <br/>
        (10 char max)
       {/* <font aline="center" size="1px">hh</font> */}
    </th>
    <th>Percentage* (only number)
    <br/>
        (upto 2 digits)
    </th>
    <th>Year of Passing* (only number)
    <br/>
        (4 digits)
    </th>
  </tr>
  <tr>
    <td>	Class X</td>
    <td>
    <input required id="classxboard" name="classxboard" placeholder="*" onChange={ValidationHandle} type="text"/>
    {/* {console.log("error.classxboard",error.classxboard)} */}
               {classxboard && 
                <span className='error'>{classxboard}</span>}
    </td>
    <td>
        <input id="classxpercentage" required name="classxpercentage" placeholder="*" onChange={ValidationHandle} type="number"/>
        {/* {console.log("error.classxpercentage",error.classxpercentage)} */}
               {classxpercentage && 
                <span className='error'>{classxpercentage}</span>}
    </td>
    <td>
        <input id="classxpassingyear" required name="classxpassingyear" onChange={ValidationHandle}  type="number"/>
        {/* {console.log("error.classxpassingyear",error.classxpassingyear)} */}
               {classxpassingyear && 
                <span className='error'>{classxpassingyear}</span>}
        </td>
  </tr>
  <tr>
    <td>Class XII</td>
    <td><input id="classxiiboard" required name="classxiiboard" onChange={ValidationHandle} type="text"/>
    {/* {console.log("error.classxiiboard",error.classxiiboard)} */}
               {classxiiboard && 
                <span className='error'>{classxiiboard}</span>}
    </td>
    <td>
        <input id="classxiipercentage" required name="classxiipercentage" onChange={ValidationHandle} type="number"/>
        {/* {console.log("error.classxiipercentage",error.classxiipercentage)} */}
               {classxiipercentage && 
                <span className='error'>{classxiipercentage}</span>}
        </td>
    <td><input id="classxiipassingyear" required name="classxiipassingyear" onChange={ValidationHandle} type="number"/>
    {/* {console.log("error.classxiipassingyear",error.classxiipassingyear)} */}
               {classxiipassingyear && 
                <span className='error'>{classxiipassingyear}</span>}
    </td>
  </tr>
  <tr>
    <td>Graduation</td>
     <td><input id="graduationboard" required name="graduationboard" onChange={ValidationHandle} type="text"/>
     {/* {console.log("error.graduationboard",error.graduationboard)} */}
               {graduationboard && 
                <span className='error'>{graduationboard}</span>}
     </td>
     <td><input id="graduationpercentage" required name="graduationpercentage" onChange={ValidationHandle} type="number"/>
     {/* {console.log("error.graduationpercentage",error.graduationpercentage)} */}
               {graduationpercentage && 
                <span className='error'>{graduationpercentage}</span>}
     </td>
     <td><input id="graduationpassingyear" required name="graduationpassingyear" onChange={ValidationHandle} type="number"/>
     {/* {console.log("error.graduationpassingyear",error.graduationpassingyear)} */}
               {graduationpassingyear && 
                <span className='error'>{graduationpassingyear}</span>}
     </td>
  </tr>
  <tr>
    <td>Masters</td>
    <td><input id="masterboard" required name="masterboard" onChange={ValidationHandle} type="text"/>
    {/* {console.log("error.masterboard",error.masterboard)} */}
               {masterboard && 
                <span className='error'>{masterboard}</span>}
    </td>
    <td><input id="masterpercentage" required name="masterpercentage" onChange={ValidationHandle} type="number"/>
    {/* {console.log("error.masterpercentage",error.masterboard)} */}
               {masterpercentage && 
                <span className='error'>{masterpercentage}</span>}
    </td>
    <td><input id="masterpassingyear" required name="masterpassingyear" onChange={ValidationHandle} type="number"/>
    {/* {console.log("error.masterpassingyear",error.masterpassingyear)} */}
               {masterpassingyear && 
                <span className='error'>{masterpassingyear}</span>}
    </td>
  </tr>
 
</table>

              </div>
            </Grid>
            
                
            	<a href="#"></a>
            	<input type="submit" className="btn" value="Update"/>
                <a href="#"></a>
            </form>
        </div>
    </div>
      </main>
    </div>
  );
}
