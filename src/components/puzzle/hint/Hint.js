import React from 'react';
import './Hint.css';


class Hint extends React.Component{
    constructor(props){
        super(props);
        this.handleRevealHint = this.handleRevealHint.bind(this);
        this.state = {content: <button id="hints" onClick={this.handleRevealHint}>Révéler un indice</button>, revealed: 0}; 
    }

    componentDidMount(){
        //Affichage des indices déjà révélés
        if(this.props.revealedHints){
            this.showSavedHints();
        }
    }
    

    handleRevealHint(){
        if(this.state.revealed<this.props.hints.length){
            let currentContent = [this.state.content];
            this.setState({revealed: this.state.revealed+1});
            let content = (isURL(this.props.hints[this.state.revealed]))? <a href={this.props.hints[this.state.revealed]} target="_blank">Consulter une ressource externe</a> : <h3 key={this.state.revealed}>{this.props.hints[this.state.revealed]}</h3>;
            currentContent.push(content);
            this.setState({content: currentContent});

            let savedProgression = JSON.parse(localStorage.getItem("progression"));
            if(!savedProgression["revealedHints"]){
                savedProgression["revealedHints"] = [];
            }
            
            const title = this.props.title;
            let found = false;

            for(const hint of savedProgression["revealedHints"]){
                if(hint["puzzleTitle"].trim()===title.trim()){
                    hint["hintList"].push(this.props.hints[this.state.revealed]);
                    found = true;
                    break;
                }
            }
            if(!found){
                savedProgression["revealedHints"].push({puzzleTitle: title, hintList: [this.props.hints[this.state.revealed]]});
            }
            
            localStorage.setItem("progression",JSON.stringify(savedProgression));
        }
        else{
            document.getElementById("hints").remove();
            alert("Tous les indices ont été révélés");
        }
    }

    /**
     * Affiche les indices déjà révélés dans le cas d'une reprise de partie
     */
    showSavedHints(){
        const progression = JSON.parse(localStorage.getItem("progression"));
        for(const hintObject of progression["revealedHints"]){
            if(hintObject["puzzleTitle"]===this.props.title){
                let currentContent = [this.state.content];
                let i = 0;
                for(const hint of hintObject["hintList"]){      
                    currentContent.push(<h3 key={i}>{hint}</h3>);
                    i++;
                }
                this.setState({content: currentContent, revealed: i});
                break;
            }
        }
    }

    render(){
        return (
            <div>
                {this.state.content}
            </div>
        );
    }
}
export default Hint;

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }