import React, { Component } from 'react';
import * as ACTIONS from '../actions/actions';

import { connect } from 'react-redux';

class Container1 extends Component {
    state = {
        containerState: null
    }
    
    // componentDidMount() {
    //     this.props.auth.getProfile();
    // }


    handleChange = (e) => {
        // alert(e.target.value);
        this.setState({ containerState: e.target.value });
    }

    render() {
        // const user_text = 'user_inputed_output';
        return (
            <div>
                {this.state.containerState} | { this.props.is_authenticated ? 'success' : 'failure' }
                <input type="text" name="input" onChange={this.handleChange}/>
                <br />

                {/* <button onClick={() => this.props.auth.login()}>Login</button> */}

                <button onClick={() => console.log(this.props.auth.userProfile)}>Show Profile</button>
                <button onClick={() => console.log(this.props.user_profile)}>Get State</button>
                <button onClick={() => this.props.action1()}>Change to True</button>
                <button onClick={() => this.props.action2()}>Change to False</button>
                <button onClick={() => this.props.perform(this.state.containerState)}>Perform function</button>
                {this.props.user_input}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myprop1: state.reducer1.stateprop1,
        user_input: state.performAction.val,
        is_authenticated: state.auth_reducer.is_authenticated,
        user_profile: state.auth_reducer.profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action1: () => dispatch(ACTIONS.SUCCESS),
        action2: () => dispatch(ACTIONS.FAILURE),
        perform: (text) => dispatch(ACTIONS.performAction(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container1);
