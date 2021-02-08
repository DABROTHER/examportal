import React from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import '../../App.css';
// import img from'../img/av
import avtar from '../img/avatar.svg';
import bg from '../img/bg.svg';
import wave from '../img/wave.png';
import Swal from 'sweetalert2';
import firebase from 'firebase';

const axios = require('axios')


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  const [email, setEmail] = React.useState([]);
  const [password, setPassword] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const ValidationHandle = (event) =>{
    event.preventDefault();
    var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { name, value } = event.target;
    console.log("name",name)
    switch (name) {
        
        case 'email': 
       //  setError({email: value.match(emailRegex)
           setEmail( value.match(emailRegex)
           ? ''
           : 'Please enter correct email')
          break;
         default:
               break;
      }

  }
  const LoginUser = (e) =>{
      e.preventDefault();
      console.log("login",email)
      var getemail = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      console.log(email, password)
      firebase
      .auth()
      .signInWithEmailAndPassword(getemail, password)
      .then(() => {
          props.history.push(`/studentdashboard`)
          
      }, err => {
        //   alert(err.message)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
            // footer: '<a href>Why do I have this issue?</a>'
          })
          console.log(err)
      });
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
         
          <Typography variant="h6" noWrap>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <img className="wave" src={wave}/>
	<div className="container">
		<div className="img">
			<img src={bg}/>
		</div>
		<div className="login-content">
			<form style={{width:"500px", marginLeft:"10%"}} onSubmit={LoginUser}>
				<img src={avtar}/>
				<h2 className="title">Welcome</h2>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		{/* <h5>Username</h5> */}
           		   		<input placeholder="Email" name="email" onChange={ValidationHandle} id="email" type="text" className="input"/>
                              {email&& 
                <span className='error'>{email}</span>}
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	{/* <h5>Password</h5> */}
           		    	<input placeholder="Password" id="password" type="password" className="input"/>
            	   </div>
            	</div>
            	<a href="/password">Forgot Password?</a>
            	<input type="submit" className="btn" value="Login"/>
                <a href="/signup">Sign up?</a>
            </form>
        </div>
    </div>
      </main>
    </div>
  );
}
