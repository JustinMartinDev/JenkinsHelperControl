import React, {Component} from 'react';
import constant from '../../constant';

class TypeLogo extends Component {
    constructor(props) {
        super(props);
        this.jobType = props.jobType
    }

    render() {
            var logo = null;
            for(var [key, value] of constant.logoType){
                if(this.jobType.toLowerCase().includes(key.toLowerCase())){
                    logo = value    
                }
            }
           return (<img src={logo} alt="type" className="rounded-circle logo-type"/>);
    }
}

export default TypeLogo;
