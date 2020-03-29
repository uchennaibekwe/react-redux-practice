import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from './history';
import * as ACTIONS from '../actions/actions';

class AuthCheck extends Component {
    componentDidMount() {
        // console.log(this.props.auth.userProfile);
        // alert('mounted: ' + this.props.auth.isAuthenticated());
        if(this.props.auth.isAuthenticated()) {
            this.props.login_success();
            this.props.add_profile(this.props.auth.userProfile); // dispatch 
            history.replace('/');
        } else {
            this.props.login_failure();
            this.props.remove_profile(); // dispatch
            history.replace('/');
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

function mapStateToProps (state) {
    // fetch the redux store state
    return {

    }
}

function mapDispatchToProps (dispatch) {
    // update redux sore state
    return {
        login_success: () => dispatch(ACTIONS.login_success()),
        login_failure: () => dispatch(ACTIONS.login_failure()),
        add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
        remove_profile: () => dispatch(ACTIONS.remove_profile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);