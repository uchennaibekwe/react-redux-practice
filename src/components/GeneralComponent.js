import React, { Component } from 'react';

export default class GeneralComponent extends Component {
    render() {
        return (
            <div>
                This is Component for link {this.props.match.params.id}
                {/* {console.log(this.props)} */}
            </div>
        )
    }
}
