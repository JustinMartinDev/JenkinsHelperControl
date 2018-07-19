import constant from '../../constant.js';

import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';

import StateLogo from './StateLogo';
import TdConsoleUrl from './TdConsoleUrl';
import RowMultipleBuildView from "./RowMultipleBuildView";
import TypeLogo from '../utils/TypeLogo';


class RowBuildView extends Component {
    static id = 0;
    constructor(props) {
        RowBuildView.id++;
        super(props);
        this.job = props.job;
        this.isMultiple = this.job._class.includes("MultiJobProject");
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new page
    }

    render() {
        return (
            <React.Fragment>
                <tr className={"bg-" + this.job.color.split("_")[0]}>
                    <td className={this.isMultiple ? 'toggleClick' : ''} id={this.isMultiple ? 'toggler'+RowBuildView.id : ''} toggle-action={this.isMultiple ? 'show' : ''}>
                        {this.isMultiple ? (
                            <Fa icon='eye' size="2x" aria-hidden="true"/>
                            ): (null
                            )
                        }
                    </td>
                    <td><TypeLogo jobType={this.job._class}/></td>
                    <td>{this.job.name}</td>
                    <td><StateLogo color={this.job.color}/></td>
                    <td><Button color="info" onClick={this.clickButton.bind(this, this.job.url)} rounded>Open</Button></td>
                    <TdConsoleUrl jobUrl={this.job.url}/>
                </tr>
                <RowMultipleBuildView job={this.job} toggler={"toggler"+RowBuildView.id}/>
            </React.Fragment>
        );
    }
}

export default RowBuildView;