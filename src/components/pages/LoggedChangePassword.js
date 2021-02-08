import React, { useEffect } from 'react';
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
import firebase from 'firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
// })),
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
  const [user, setUser] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState("password");
  const [reShowPassword, setReShowPassword] = React.useState("password");
  const [showPasswordIcon, setShowPasswordIcon] = React.useState(false);
  const [reShowPasswordIcon, setReShowPasswordIcon] = React.useState(false);
  const [matchPassword, setMatchPassword] = React.useState();
  const [reMatchPassword, setReMatchPassword] = React.useState();
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
const Dashboard = () =>{
    props.history.push('/studentdashboard')
}

const Edit = () =>{
    props.history.push('/update') 
}
  const Logout = (e)=>{
    // e.preventDefault()
    console.log("logout")
    // props.history.push('/')
    firebase.auth().signOut()
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const reChangeIcon =()=>{
    if(!reShowPasswordIcon){
        setReShowPassword('text')
        setReShowPasswordIcon(true)
        // console.log("true")
    }
    else{
      setReShowPassword('password')
      setReShowPasswordIcon(false)
    //   console.log("false")
    }
  }

  const changeIcon = () =>{
    //   console.log("changeIcon")
      if(!showPasswordIcon){
          setShowPassword('text')
          setShowPasswordIcon(true)
        //   console.log("true")
      }
      else{
        setShowPassword('password')
        setShowPasswordIcon(false)
        // console.log("false")
      }
  }
  const ValidationHandle = (event) =>{
    event.preventDefault();
    var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const { name, value } = event.target;
    console.log("name",name)
    var password = document.getElementById("password").value;
    console.log("pass",password)
    switch (name) {
        
        case 'password': 
       //  setError({email: value.match(emailRegex)
       setMatchPassword( value.match(passwordRegex)
           ? ''
           : 'Please enter strong password')
          break;
          case 'repassword': 
          //  setError({email: value.match(emailRegex)
          setReMatchPassword( value===password
              ? ''
              : 'password does not matched')
             break;
             default:
               break;
      }

  }
  const changePassword = (e) =>{
      e.preventDefault();
      if(matchPassword || reMatchPassword){

      }
      else{
          var password = document.getElementById("password").value;
          var rePassword = document.getElementById("repassword").value;
          if(password && rePassword){
            if(password===rePassword){
                var user = firebase.auth().currentUser;
                console.log("user",user)
                var newPassword = rePassword;
                // console.log("newPassword",newPassword)
                setTimeout(() => {
                    user.updatePassword(newPassword)
                    .then(function() {
                        // console.log("suc")
                        Swal.fire('Password is updated')
                      // Update successful.
                    }).catch(function(error) {
                        // console.log("err",error.message)
                        Swal.fire(`${error.message} or Please go to forget password`)
                      // An error happened.
                    });   
                }, 1500);
            }
            else{
                // alert("password not matched")
                Swal.fire('password not matched')
            }
          }
          else{
// alert("please fill value")
Swal.fire('please fill value')
          }
      }
      
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
            Forget Password
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
          {['Dashboard',].map((text, index) => (
            <ListItem button onClick={Dashboard} title="Dashboard">
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Edit',].map((text, index) => (
            <ListItem button onClick={Edit} title="Edit">
              <ListItemIcon><EditIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <form className={classes.form} noValidate onSubmit={changePassword}>
            <div>
            <TextField
            variant="outlined"
            margin="normal"
            required
            type={showPassword}
            fullWidth
            id="password"
            label="Password"
            name="password"
            // autoComplete="otp"
            autoFocus
            onChange={ValidationHandle}
          />
           {matchPassword&& 
                <span className='error'>{matchPassword}</span>}
                </div>
          <div style={{float:"right", marginRight:"-5%", marginTop:"-12%"}}>{showPasswordIcon?<i onClick={changeIcon} class="fa fa-eye-slash" aria-hidden="true"></i>:<i onClick={changeIcon} class="fa fa-eye" aria-hidden="true"></i>}</div>
          <div><TextField
            variant="outlined"
            margin="normal"
            type={reShowPassword}
            required
            fullWidth
            id="repassword"
            label="Repassword"
            name="repassword"
            // autoComplete="otp"
            autoFocus
            onChange={ValidationHandle}
          />
          {reMatchPassword&& 
                <span className='error'>{reMatchPassword}</span>}
          
          </div>
            <div style={{float:"right", marginRight:"-5%", marginTop:"-12%"}}>
            {reShowPasswordIcon?<i onClick={reChangeIcon} class="fa fa-eye-slash" aria-hidden="true"></i>:<i onClick={reChangeIcon} class="fa fa-eye" aria-hidden="true"></i>}
            </div>
         
          
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Resend OTP?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
      </main>
    </div>
  );
}
