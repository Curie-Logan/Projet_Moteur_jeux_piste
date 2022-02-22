import React from 'react';

import './Description.css';

class Description extends React.Component{
    /**
     * Get the content of the place description
     * @returns the content of the description
     */
    getContent(){
        let content = [];
        let key = 0;

        for(let data of this.props.infos){
            if(typeof data == "string"){ //A string for a simple paragraph
                content.push(<p key={key}>{data}</p>);

            }else{//An array of strings for a list of items
                let items = [];

                for(let i = 0; i < data.length; ++i){
                    if(i < data.length-1){
                        items.push(<li key={key}>{data[i]},</li>);
                    }else{
                        items.push(<li key={key}>{data[i]}.</li>);
                    }
                    key++;
                }
                content.push(<ul>{items}</ul>);
            }
            key++;
        }

        return content;
    }

    render(){
        return(
            <div id='description'>
                {this.getContent()}
            </div>
        );
    }
    
} export default Description;
