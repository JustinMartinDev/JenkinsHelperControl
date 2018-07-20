import React, {Component} from 'react';
import {Badge, Fa} from 'mdbreact';

class BadgeIcon extends Component {
    constructor(props) {
        super(props);
        this.color = props.color;
        this.icon = props.icon;
    }

    render() {
        return (
            <Badge color={this.color} pill>
                <Fa icon={this.icon} size="2x" aria-hidden="true"/>
            </Badge>
        );
    }
}

export default BadgeIcon;