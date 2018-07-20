import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, Table} from 'mdbreact';
import {PacmanLoader} from 'react-spinners';
import constant from '../../constant.js';
import RowBuildView from './RowBuildView.js'

function sortBuild(b, a){
    if (b._class.toLowerCase().includes("Multi"))
        return -1;
    if (a._class.toLowerCase().includes("Multi"))
        return 1;
    // a doit être égal à b
    return 0;
}

class BuildView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        };
    }

    componentDidMount() {
        fetch("http://"+constant.serverUrl+"/api/json?pretty=true")
            .then(res => res.json())
            .then(
                (result) => {
                    var d = result.jobs.sort(sortBuild);
                    console.log(result.jobs);
                    console.job(d);
                    this.setState({
                        isLoaded: true,
                        items: result.jobs
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

    render() {
        const { error, isLoaded, items} = this.state;
        if (error) {
            return(
            <Card color="red lighten-1" text="white" className="text-left">
                <CardBody>
                    Error with the api call :
                    <ul>
                        <li>Serveur : {constant.serverUrl}</li>
                        <li>Action : "liste jobs"  </li>
                        <li>Message : {error.message}</li>
                    </ul>
                </CardBody>
            </Card>);
        } else if (!isLoaded) {
            return <div><PacmanLoader color={'#c0392b'} loading={true} /></div>;
        } else {

            return (
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
                                            {items.map(job => (
                                                <RowBuildView job={job}/>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}
export default BuildView;