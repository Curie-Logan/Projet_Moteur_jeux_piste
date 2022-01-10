import React from "react";
import './File.css';


class File extends React.Component{

    showFile(){
        const src = this.props.file["src"];
        switch(this.props.file["type"]){
            case "picture":
                return <img alt="" src={src}></img>
            case "audio":
                return <audio src={src}></audio>;
            case "link":
                return <a href={src}>{src}</a>
        }
    }
    
    render(){
        return (
           <div>
               <h4>Ressource pour l'énigme :</h4>
              {this.showFile()}
           </div>
        );
    }
}

export default File;