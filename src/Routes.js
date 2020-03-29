import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container1 from './components/Container1';
import Component2 from './components/Component2';
import Callback from './components/Callback';

import Header from './components/Header';
import history from './utils/history';
// import { createBrowserHistory } from 'history';

import { Router, Route, Switch, Redirect} from 'react-router';
import GeneralComponent from './components/GeneralComponent';
import AuthCheck from './utils/AuthCheck';

import Auth from './utils/auth';
import UnauthRedirect from './components/unAuthRedirect';
import protectedRoute from './components/protectedRoute';
import Profile from './components/Profile';

import * as ACTIONS from './actions/actions';

// handle the auth in the callback
const auth = new Auth();
const handleAuthentication = (props) => {
    if(props.location.hash) {
        auth.handleAuth(); // from the Auth class
    }
}

const PrivateRoute = ({ component: Component, auth }) => (
    <Route render={props => auth.isAuthenticated() === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{pathname:'/redirect'}} />
        }
    />
)

class Routes extends Component {
    
    componentDidMount() {
        // silent authentication of user
        if(auth.isAuthenticated()) {
            this.props.login_success();
            auth.getProfile();
            // wait for some time so that the 'userProfile' object woudl be available
            // this can be fixed with "js Promise"
            setTimeout(() => {console.log(auth.userProfile)}, 10000);
            setTimeout(() => {this.props.add_profile(auth.userProfile)}, 2000); // dispatch 
        } else {
            this.props.login_failure();
            this.props.remove_profile(); // dispatch
        }
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header auth={auth}/>
                        <Switch>
                            <Route exact path="/" render={() => <Container1 auth={auth}/>} />
                            {/* <Route exact path="/" component={Container1} /> */}
                            <Route path='/authcheck' render={() => <AuthCheck auth={auth}/>}/>
                            <Route path="/callback" render={(props) => { handleAuthentication(props); return <Callback {...props}/>} }/>
                            
                            <Route path="/redirect" component={UnauthRedirect} />
                            
                            <Route path="/second" render={(props) => <Component2 {...props}/>} />
                            <Route path='/general/:id' render={(props) => <GeneralComponent {...props}/>} />

                            <PrivateRoute path="/privateroute" auth={auth} component={protectedRoute} />
                            <PrivateRoute path="/profile" auth={auth} component={Profile} />
                        </Switch>
                    </div>
                </Router> 
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login_success: () => dispatch(ACTIONS.login_success()),
        login_failure: () => dispatch(ACTIONS.login_failure()),
        add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
        remove_profile: () => dispatch(ACTIONS.remove_profile()),
    }
}

export default connect(null, mapDispatchToProps)(Routes);