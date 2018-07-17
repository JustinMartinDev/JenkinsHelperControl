import constant from '../constant.js';

import React, {Component} from 'react';
import {Button} from 'mdbreact';

import StateLogo from './StateLogo';
import TdConsoleUrl from './TdConsoleUrl';


class RowBuildView extends Component {
    constructor(props) {
        super(props);
        this.job = props.job;
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new page
    }

    render() {
        if (!this.job._class.includes("MultiJobProject")) return null;
        return (
            <tr>
                <th scope="row"><TypeLogo type={this.job._class}/></th>
                <td>{this.job.name}</td>
                <td><StateLogo color={this.job.color}/></td>
                <td><Button color="info" onClick={this.clickButton.bind(this, this.job.url)} rounded>Open</Button></td>
                <TdConsoleUrl jobUrl={this.job.url}/>
            </tr>
        );
    }
}
function TypeLogo(props){
    return(
        <img src={constant.logoType[props.type]} alt="type" className="rounded-circle logo-type"/>
    );
}

export default RowBuildView;