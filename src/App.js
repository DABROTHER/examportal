import logo from './logo.svg';
// import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/auth/login";
import Signup from './components/auth/signup'
import firebase from 'firebase';
import StudentDashboard from './components/pages/studentDashboard';
import ForgetPassword from './components/pages/forgetpassword';
import Adminlogin from "./components/admin/login";
import AdminDashboard from './components/admin/admindashboard';
import StudentUpdate from './components/pages/updateStudentDetails';
import ChangePassword from './components/pages/LoggedChangePassword'
firebase.initializeApp({
  apiKey: "AIzaSyCIuQ5sVGLz0n3uHwnj_8E1kW_PoJ6WLxo",
    authDomain: "customerapp-50d98.firebaseapp.com",
    databaseURL: "https://customerapp-50d98.firebaseio.com",
    projectId: "customerapp-50d98",
    storageBucket: "customerapp-50d98.appspot.com",
    messagingSenderId: "879647881550",
    appId: "1:879647881550:web:1e994fd41db123817d061f"
})
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
         <Route exact path="/studentdashboard" component={StudentDashboard}/>
        <Route exact path="/password" component={ForgetPassword}/>
        <Route exact path="/admin/login" component={Adminlogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/update" component={StudentUpdate} />
        <Route exact path="/changepassword" component={ChangePassword} />  
      </Router>
      
    </div>
  );
}

export default App;
