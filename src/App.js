import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect  } from "react-router-dom";
import Login from './components/views/login';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import UserDetails from './components/user/userDetail';
import Dashboard from './components/views/dashboard';


function App() {

  const { user, setUser } = UserDetails();
  const userProfile = user(); 

  if(!userProfile) {
    return(
      <div className="App">
      <ToastContainer/>
      <div className="container border page-view-container">
        <div className="row">
          <div className="col no-padding">
             <div className="text-center mt-4 mb-4">
                <img src="assets/images/login-side.JPG" className="img-fluid" alt="login page image"></img>
             </div>
          </div>
          <div className="col no-padding"><Login setUser={setUser}/></div>
        </div>
      </div> 
    </div>
    )
  }

  return (
    <div className="App">
      <ToastContainer/>
      <div className="container border page-view-container">
          <Switch>
            <Route path="/dashboard" exact render={()=><Dashboard/>}/>
            <Route path="/" exact render={()=><Dashboard/>}/>
            <Redirect to="/not-found" />
          </Switch>
      </div> 
    </div>
  );
}

export default App;
