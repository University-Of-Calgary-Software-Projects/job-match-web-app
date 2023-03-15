import React from "react";
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Pages/Navbar";
import { Paper } from "@mui/material";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/ErrorPage";
import JobSearch from "./Pages/JobSearch";
import JobPosts from "./Pages/JobPosts";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import Applications from "./Pages/Applications";
import JobPost from "./Pages/JobPost";
// import BasicModal from "./Pages/Modal";
import CreateJobPost from "./Pages/CreateJobPost";
import Apply from "./Pages/Apply";
import SignInModal from "./Components/SigninModal";


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <Router>
      <Paper sx={{ boxShadow: "none", border: "none", borderRadius: 0 }}>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <Paper sx={{ boxShadow: "none", border: "none", borderRadius: 0 }}>
            <NavBar>
              {/* <BasicModal /> */}
              <SignInModal />
              <Switch>
                <Route exact path="/" component={JobSearch} />
                <Route exact path="/job-posts" component={JobPosts} />
                <Route exact path="/job-posts/:jobId" component={JobPost} />
                <Route exact path="/offers" component={Offers} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/applications" component={Applications} />
                <Route exact path="/new-job-post" component={CreateJobPost} />
                <Route exact path="/apply" component={Apply} />
                {/* 
                
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/company-profile" component={CompanyProfile} />
                
                <Route exact path="/projects/:id/contributors" component={Contributors} /> */}
                <Route exact path='*' component ={ErrorPage} />
              </Switch>
            </NavBar>
          </Paper>
        </Switch>
      </Paper>
    </Router>
  )

}

export default App;
