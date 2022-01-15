import React from 'react';

import './Description.css';

class Description extends React.Component{
    constructor(props){
        super(props);
        this.infos = this.props.infos;
    }

    render(){
        let content = [];
        for(let paragraph of this.infos){
            let p = <p>{paragraph}</p>
            content.push(p);
        }

        return(
            <div id='description'>
                {content}
            </div>
        );
    }
} export default Description;
