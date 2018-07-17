import React, {Component} from 'react';
import {Card, CardBody} from 'mdbreact';
import {PacmanLoader} from 'react-spinners';
import constant from '../constant.js';
import BadgeIcon from './BadgeIcon.js';

class TdConsoleUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            consoleUrl: null
        };
        this.jobUrl = props.jobUrl;
    }

    componentDidMount() {
        fetch(this.jobUrl+"/api/json?pretty=true")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        consoleUrl: this.jobUrl+result.builds[0].number+"/console"
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
    }

    clickButton(url, e) {
        e.preventDefault();
        window.open(url, "_blank") //to open new page
    }

    render() {
        const {error, isLoaded, consoleUrl} = this.state;
        if (error) {
            return(
            <Card color="red lighten-1" text="white" className="text-left">
                <CardBody>
                    Error with the api call :
                    <ul>
                        <li>Serveur : {constant.serverUrl}</li>
                        <li>Action : "console job"  </li>
                        <li>Message : {error.message}</li>
                    </ul>
                </CardBody>
            </Card>);
        }
        else if (!isLoaded)
            return <td><PacmanLoader color={'#c0392b'} loading={true} /></td>;
        else
            return <td onClick={this.clickButton.bind(this, consoleUrl)}><BadgeIcon color='black' icon='code'/></td>
    }
}
export default TdConsoleUrl;