import React, {Component} from 'react';
import {Container, Row, Col, Table, Button, Card, CardBody} from 'mdbreact';
import {PacmanLoader} from 'react-spinners';
import constant from '../../constant';


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
            if (build.builName.includes("»")) {
                return (constant.serverUrl + "/" + build.builName.split(" ")[0] + "/" + build.jobName + "/" + build.number);
            }
            else {
                return (constant.serverUrl + "/" + build.jobName + "/" + build.number);
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
                                    <h2 className="h2-responsive pb-4">Build View :</h2>
                                    <div style={{'display': 'block', 'overflowY': 'auto'}}>
                                        <Table responsive>
                                            <thead className="mdb-color lighten-4">
                                            <tr>
                                                <th className="th-sm"> </th>
                                                <th className="th-lg">Type</th>
                                                <th className="th-lg">Name Job</th>
                                                <th className="th-lg">State</th>
                                                <th className="th-lg">Url job</th>
                                                <th className="th-lg">Console</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {builds.map(build => (
                                                <tr className={"bg-" + build.result}  >
                                                    <td>build.number</td>
                                                    <td>{build.buildName}</td>
                                                    <td>{new Date(build.startTime).toDateString()}/></td>
                                                    <td>{new Date(build.duration).toDateString()}</td>
                                                    <td>
                                                        <Button color="info" onClick={this.clickButton.bind(this, getUrl(build))} rounded>
                                                            Open
                                                        </Button>
                                                    </td>
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

export default HistoryBuild