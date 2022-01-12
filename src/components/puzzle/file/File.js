import React from "react";
import './File.css';


class File extends React.Component{

    showFile(){
        const src = this.props.file["src"];
        console.log("source: "+src);
        switch(this.props.file["type"]){
            case "picture":
                return <img alt="" src={process.env.PUBLIC_URL+"/games/resources/"+src}></img>
            case "audio":
                return <audio controls src={process.env.PUBLIC_URL+"/games/resources/"+src}></audio>;
            case "link":
                return <a href={src}>{src}</a>
            default:
                return false;
        }
    }
    
    render(){
        return (
           <div>
              {this.showFile()}
           </div>
        );
    }
}

export default File;