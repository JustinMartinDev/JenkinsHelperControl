import React, {Component} from 'react';
import {Container, Row, Col, Table, Button, Card, CardBody} from 'mdbreact';
import {PacmanLoader} from 'react-spinners';
import BadgeIcon from '../utils/BadgeIcon';
import constant from '../../constant';
import StateLogo from "../buildView/StateLogo";


class HistoryBuild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            builds: []
        };
    }

    componentDidMount() {
        fetch("http://"+constant.serverUrl+"/view/mission-control-view//api/json?_="+new Date().getTime())
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        builds: result.builds
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
        const { error, isLoaded, builds} = this.state;
        console.log(builds);
        function getUrl(build) {
            if (build.buildName.includes("»")) {
                return (constant.serverUrl + "/job/" + build.buildName.split(" ")[0] + "/" + build.jobName + "/" + build.number+"/");
            }
            else {
                return (constant.serverUrl + "/job/" + build.jobName + "/" + build.number+"/");
            }
        }

        if (error) {
            return(
                <Card color="red lighten-1" text="white" className="text-left">
                    <CardBody>
                        Error with the api call :
                        <ul>
                            <li>Server : {constant.serverUrl}</li>
                            <li>Action : "liste historics"  </li>
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
                <Container className="mt-3">
                    <Row className="py-3">
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <h2 className="h2-responsive pb-4">History View :</h2>
                                    <div style={{'display': 'block', 'overflowY': 'auto'}}>
                                        <Table responsive>
                                            <thead className="mdb-color lighten-4">
                                            <tr>
                                                <th className="th-lg">Name Job</th>
                                                <th className="th-lg">State</th>
                                                <th className="th-lg">Time Start</th>
                                                <th className="th-lg">Duration</th>
                                                <th className="th-lg">Console</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {builds.map(build => (
                                                <tr className={"bg-" + build.result}>
                                                    <td>{build.buildName}</td>
                                                    <td><StateLogo color={build.result}/></td>
                                                    <td>{new Date(build.startTime).toDateString()}</td>
                                                    <td>{new Date(build.duration).getSeconds().toString().toHHMMSS()}</td>
                                                    <td onClick={this.clickButton.bind(this, getUrl(build)+"console")}><BadgeIcon color='black' icon='code'/></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

export default HistoryBuild