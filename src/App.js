import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import BuildView from './Components/BuildView.js';
import {Button} from 'mdbreact';

import constant from './constant.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        };
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="./img/superhero.png" className="App-logo" alt="logo" />
                    <h1 className="App-title">Jenkins Helper Control</h1>
                </header>
                <Button color="secondary" onClick={() => this.setState({ isPaneOpen: true })}>Build historics</Button>
                <div className="row">
                    <BuildView/>
                </div>
                <SlidingPane
                    className='some-custom-class'
                    overlayClassName='some-custom-overlay-class'
                    isOpen={ this.state.isPaneOpen }
                    title='Build historics'
                    onRequestClose={ () => {
                        // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    } }>
                </SlidingPane>
            </div>
        );
    }
}

export default App;
