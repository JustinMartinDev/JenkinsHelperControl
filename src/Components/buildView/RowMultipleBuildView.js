import React, {Component} from 'react';
import {Button, Card, CardBody} from 'mdbreact';
import {PacmanLoader} from 'react-spinners';
import StateLogo from './StateLogo';
import TdConsoleUrl from './TdConsoleUrl';
import constant from '../../constant';
import TypeLogo from '../utils/TypeLogo';


class RowMultipleBuildView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            subBuilds: []
        };
        this.job = props.job;
        this.toggler = props.toggler;
    }

    componentDidMount() {
      fetch(this.job.url + "/api/json?pretty=true")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                            isLoaded: true,
                            subBuilds: result.downstreamProjects
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                });
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new page
    }

    render() {
        const { error, isLoaded, subBuilds} = this.state;
        if (error) {
            return(
                <Card color="red lighten-1" text="white" className="text-left">
                    <CardBody>
                        Error with the api call :
                        <ul>
                            <li>Server : {constant.serverUrl}</li>
                            <li>Action : "liste subsjobs"  </li>
                            <li>Message : {error.message}</li>
                        </ul>
                    </CardBody>
                </Card>);
        }
        else if (!isLoaded) {
            return <div><PacmanLoader color={'#c0392b'} loading={true} /></div>;
        }
        else {
            return(
                <React.Fragment>
                    {subBuilds.map(subBuild => (
                    <tr toggler-id={this.toggler} className={"collapse bg-" + subBuild.color.split("_")[0]}  >
                        <td></td>
                        <td><TypeLogo jobType={subBuild._class}/></td>
                        <td>{subBuild.name}</td>
                        <td><StateLogo color={subBuild.color}/></td>
                        <td><Button color="info" onClick={this.clickButton.bind(this, subBuild.url)} rounded>Open</Button></td>
                        <TdConsoleUrl jobUrl={subBuild.url}/>
                    </tr>
                ))}
                </React.Fragment>
            );
        }
    }
}

export default RowMultipleBuildView