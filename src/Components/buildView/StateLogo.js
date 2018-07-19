import React, {Component} from 'react';
import BadgeIcon from './BadgeIcon';
import {HashLoader} from 'react-spinners';
import constant from '../../constant';

class StateLogo extends Component {
    constructor(props) {
        super(props);
        this.color = props.color;
        this.state = {
            loading: true
        }
    }

    render() {
        if(this.color.includes("_")) {
            var tab = this.color.split("_")[0];
            if(tab==="blue") tab="green";
            return <HashLoader color={constant.bgColors[tab]} loading={this.state.loading}/>;
        }
        else if(this.color === "blue")
            return <BadgeIcon color='green' icon='thumbs-up'/>;
        else if(this.color === "red")
            return <BadgeIcon color='red' icon='thumbs-down'/>;
        else
            return <BadgeIcon color='grey' icon='minus'/>;
    }
}

export default StateLogo;