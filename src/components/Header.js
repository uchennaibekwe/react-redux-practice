import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        nums: [
            {id: 1},
            {id: 2},
            {id: 3}
        ]
    }

    render() {
        return (
            <div>
                <Link to={{pathname: '/'}} style={{padding:'7px'}}>
                    Home
                </Link>
                
                <Link to={{pathname: '/profile'}} style={{padding:'7px'}}>
                    Profile
                </Link>

                <Link to={{pathname: '/privateroute'}} style={{padding:'7px'}}>
                    Private Route
                </Link>

                {!this.props.is_authenticated
                ? <button onClick={() => this.props.auth.login()}>Login</button>
                : <button onClick={() => this.props.auth.logout()}>Logout</button>
                }

                <Link to='/second'>
                    Second Container
                </Link>

                {this.state.nums.map(num => 
                    <Link key={num.id} to={{pathname: '/general/' + num.id}} style={{padding:'7px'}}>link{num.id}</Link>    
                )}

                <br />
                <button onClick={() => { alert(this.props.auth.isAuthenticated()) }}>CheckAuth</button>
                {/* <button onClick={() => { this.props.auth.login(); alert(this.props.auth.is_authenticated()) }}>Login</button>
                <button onClick={() => {this.props.auth.logout(); alert(this.props.auth.is_authenticated())}}>Logout</button> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        is_authenticated: state.auth_reducer.is_authenticated
    }
}

export default connect(mapStateToProps)(Header);
