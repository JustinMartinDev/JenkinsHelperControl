import React, {Component} from 'react';
import constant from '../../constant';

class TypeLogo extends Component {
    constructor(props) {
        super(props);
        TypeLogo.jobType = props.jobType
    }

    render() {
            var logo = null;
            Object.keys(constant.logoType).forEach(function(key){
                if(TypeLogo.jobType.toLowerCase().includes(key.toLowerCase())){
                    logo = constant.logoType[key];
                }
            });
            return (<img src={logo} alt="type" className="rounded-circle logo-type"/>);
    }

    static getLogo(key){

    }
}

export default TypeLogo;
