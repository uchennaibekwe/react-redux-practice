import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    UserProfile = (props) => (
        <div>
            profile: {props.profile.profile.nickname}

                <h1>{props.profile.profile.nickname}</h1>
                <img src={props.profile.profile.picture} alt="" />
                <br />
                <h4>{props.profile.profile.email}</h4>
                <h4>{props.profile.profile.name}</h4>
                <h6>Email Verified:
                    {props.profile.profile.email_verified
                    ? <i> True </i>
                    : <i> False </i>
                }</h6>
        </div>
    )


    render() {
        return (
            <div>
                {this.props.profile !== null ?
                    <this.UserProfile profile={this.props.profile} />
                :   'Profile Not Found'
                }

                {/* profile: {this.props.profile.profile.nickname}

                    <h1>{this.props.profile.profile.nickname}</h1>
                    <img src={this.props.profile.profile.picture} alt="" />
                    <br />
                    <h4>{this.props.profile.profile.email}</h4>
                    <h4>{this.props.profile.profile.name}</h4>
                    <h6>Email Verified:
                        {this.props.profile.profile.email_verified
                        ? <i> True </i>
                        : <i> False </i>
                    }</h6> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth_reducer.profile
    }
}

export default connect(mapStateToProps)(Profile);
