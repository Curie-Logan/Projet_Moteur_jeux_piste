import React from "react";

import './File.css';

class File extends React.Component{

    /**
     * Get a HTML element to display the content of the file
     * @returns the file to show
     */
    showFile(){
        const path = `${process.env.PUBLIC_URL}/games/${this.props.gameID}/resources/${this.props.file["src"]}`;
        switch(this.props.file["type"]){
            case "picture":
                return <img alt="" src={path}/>;
            case "audio":
                return <audio controls src={path}/>;
            case "link":
                return <a href={this.props.file["src"]}>{this.props.file["texte"]}</a>;
            case "video":
                return <video controls src={path}/>;
            default:
                return false;
        }
    }
    
    render(){
        return (
           <div id="file">
              {this.showFile()}
           </div>
        );
    }
}

export default File;