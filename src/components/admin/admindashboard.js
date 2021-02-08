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
// import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import firebase from 'firebase'
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import '../admin/style/admindashboard.css'
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2';
const qs = require('query-string');
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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

export default function MiniDrawer(props, data) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [studentData, setStudentData] = React.useState([]);
  const [viewStudenDetails, setViewStudenDetails] = React.useState([]);
const storeStudfentData=[]
  useEffect(()=>{
console.log("props",props)
console.log("data", localStorage.getItem('deftToken'))
const {token, utterance } = qs.parse(props.location.search);
console.log("token",token)
if(token===localStorage.getItem('deftToken')){
  console.log("success")
}
else{
  props.history.push('/admin/login')
  }
  // setTimeout(() => {
  //   localStorage.removeItem("deftToken");
  //   props.history.push('/admin/login')
  // }, 60000);
// console.log("data",data)
    firebase
    .firestore()
    .collection("deftregistration")
    .get()
    .then((querySnapshot) => {
        // console.log(querySnapshot.docs)
        storeStudfentData.push(querySnapshot.docs)
        setStudentData({data:querySnapshot.docs})
        // studentData.push(querySnapshot.docs)
        // querySnapshot.docs.map((doc) => {
        // // setStudentData({data:doc})
            
        //     // console.log(doc.id, " => ", doc);
        // });
    })
    .catch(err=>{
        console.log("err",err)
    })
  })

  const Logout = (e)=>{
    // e.preventDefault()
    console.log("logout")
    localStorage.removeItem("deftToken");
    props.history.push('/admin/login')
    // firebase.auth().signOut()
  }
  const ViewStudentDetails = (e) =>{
    // e.preventDefault();
    console.log("view",e)
    firebase
    .firestore()
    .collection("deftregistration")
    .doc(e)
    .get()
    .then((doc) => {
      if (doc.exists){
        console.log(doc.data());
        setViewStudenDetails({data:doc.data()})
      }
      else{

      }
    })
    .catch(err=>{
        console.log("err",err)
    })

    document.getElementById("myForm").style.display = "block";
  }
  const closeViewStudentDetails = (e) =>{
    e.preventDefault();
      console.log("close")
      document.getElementById("myForm").style.display = "none";
  }
  const ApprovedStudent = (e) =>{
    //   e.preventDefault();
      console.log("e",e)
      firebase
      .firestore()
      .collection("deftregistration")
      .doc(e)
      .get()
      .then((doc) => {
        if (doc.exists){
            if(doc.data().approved){
            console.log(doc.data().approved);
            Swal.fire('Already Approved')
            }
            else{
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to approve",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, approve it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        firebase
                        .firestore()
                        .collection("deftregistration")
                        .doc(e)
                        .update({
                        approved:true  
                        })
                      Swal.fire(
                        'Approved!',
                        'Your file has been approved.',
                        'success'
                      )
                    }
                  })
                
            }
            
          } else {
            console.log("No such document!");
          }
    //    console.log("eeeeeeeeee",querySnapshot)
    })
     }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
       
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <form style={{marginLeft:"-70%"}} className={classes.form} noValidate>
        {/* <h2>HTML Table</h2> */}

<table>
  <tr style={{backgroundColor:"#3CAF87"}}>
    <th>Name</th>
    <th>Email</th>
    <th>View</th>
    <th>Approve </th>
    
    
  </tr>
  {studentData.data?studentData.data.map(data=>(
    <tr>
    <td>{`${data.data().firstname} ${data.data().lastname}`}</td>
    <td>{data.data().email}</td>
    <td><Button variant="contained" onClick={()=>ViewStudentDetails(data.data().email)} style={{backgroundColor:"#3CAF87"}}>
        {/* onClick={()=>ApprovedStudent(data.data().email)} */}
  View
</Button></td>
<div class="form-popup" id="myForm">
  <form  action="/action_page.php" class="form-container">
      {console.log("ViewStudenDetails",viewStudenDetails.data?viewStudenDetails.data:'')}
    {/* <h1>Login</h1> */}

    <label  for="email"><b>Full name</b></label>
    <input disabled type="text" value={`${viewStudenDetails.data?viewStudenDetails.data.firstname:''} ${viewStudenDetails.data?viewStudenDetails.data.lastname:''}`}  name="email" required/>
    
    <label for="email"><b>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
    <input disabled type="text" value={viewStudenDetails.data?viewStudenDetails.data.email:''}  name="email" required/>
    <label for="email"><b>DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
    <input disabled type="text" value={viewStudenDetails.data?viewStudenDetails.data.DOB:''}  name="email" required/>
    <label for="email"><b>Mobile</b></label>
    <input  disabled type="text" value={viewStudenDetails.data?viewStudenDetails.data.mobilenumber:''} name="email" required/>
    <label for="email"><b>Gender &nbsp;&nbsp;</b></label>
    <input disabled type="text" value={viewStudenDetails.data?viewStudenDetails.data.gender:''}  name="email" required/>
    <label for="email"><b>Address</b></label>
    <input disabled type="text" value={`${viewStudenDetails.data?viewStudenDetails.data.city:''} ${viewStudenDetails.data?viewStudenDetails.data.pin:''} ${viewStudenDetails.data?viewStudenDetails.data.country:''}`} name="email" required/>
    
    <label for="email"><b>Hobbies &nbsp;</b></label>

    <input disabled type="text" value={`${viewStudenDetails.data?viewStudenDetails.data.hobbies[0]:''} ${viewStudenDetails.data?viewStudenDetails.data.hobbies[1]:''} ${viewStudenDetails.data?viewStudenDetails.data.hobbies[2]:''}`} name="email" required/>
    <label for="email"><b>Course &nbsp;</b></label>
    <input disabled type="text" value={viewStudenDetails.data?viewStudenDetails.data.course:''}  name="email" required/>
    <table>
  <tr>
    <th>Sl.No. Examination</th>
    <th>Board</th>
    <th>Percentage</th>
    <th>Year of Passing</th>
  </tr>
  <tr>
    <td>Class X</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.classxboard:''}</td>
    <td>{viewStudenDetails.data?`${viewStudenDetails.data.classxpercentage}%`:''}</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.classxpassingyear:''}</td>
  </tr>
  <tr>
    <td>Class XII</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.classxiiboard:''}</td>
    <td>{viewStudenDetails.data?`${viewStudenDetails.data.classxiipercentage}%`:''}</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.classxiipassingyear:''}</td>
  </tr>
  <tr>
    <td>Graduation</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.graduationboard:''}</td>
    <td>{viewStudenDetails.data?`${viewStudenDetails.data.graduationpercentage}%`:''}</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.graduationpassingyear:''}</td>
  </tr>
  <tr>
    <td>Masters</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.masterboard:''}</td>
    <td>{viewStudenDetails.data?`${viewStudenDetails.data.masterpercentage}%`:''}</td>
    <td>{viewStudenDetails.data?viewStudenDetails.data.masterpassingyear:''}</td>
  </tr>
 
</table>

    
    {/* <label for="email"><b>Email</b></label> */}
    {/* <input disabled type="button" value="close" onClick={closeViewStudentDetails} placeholder="Enter Email" name="email" required/> */}
    {/* <button type="submit" class="btn">Login</button> */}
    <button type="button" class="btn cancel" onClick={closeViewStudentDetails}>Close</button>
  </form>
</div>
{/* onClick={()=>SendMessageIndividual(row)} */}
    <td><Button onClick={()=>ApprovedStudent(data.data().email)} variant="contained" color="primary">
    {data.data().approved?"Approved":"Approve"} 
</Button></td>
  </tr>
  )
//   {
//       console.log("data",data.data().lastname)
//   }
  ):"Please wait data is updating"}
  
 
  
  
  
</table>

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
