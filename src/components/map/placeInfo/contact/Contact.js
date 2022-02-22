import React from 'react';

import './Contact.css';

class Contact extends React.Component{
    /**
     * Get the content to display in the contact bloc
     * @returns an array containing contact information
     */
    getContent(){
        let content = [];

        if(this.props.coordonnees.telephone){
            content.push(
                <tr>
                    <td>
                        <img src='./img/map/placeInfo/contact/phone.png'alt='logo téléphone'/>
                    </td>
                    <td>
                        <a href={`tel:${this.props.coordonnees.telephone}`} data-rel="external">{this.props.coordonnees.telephone}</a>
                    </td>
                </tr>
            );
        }
        
        if(this.props.coordonnees.mail){
            content.push(
                <tr>
                    <td>
                        <img src='./img/map/placeInfo/contact/email.png'alt='logo courrier'/>
                    </td>
                    <td>
                        <a href={`mailto: ${this.props.coordonnees.mail}`}>{this.props.coordonnees.mail}</a>
                    </td>
                </tr>
            );
        }

        if(this.props.coordonnees.web){
            let label = (this.props.coordonnees.web["label"])? this.props.coordonnees.web["label"] : "Site internet";
            content.push(
                <tr>
                    <td>
                        <img src='./img/map/placeInfo/contact/web.png'alt='logo internet'/>
                    </td>
                    <td>
                        <a href={this.props.coordonnees.web["lien"]}>{label}</a>
                    </td>
                </tr>
            );
        }

        return content;
    }

    render(){
        return(
            <div id='contact'>
                <table>
                    {this.getContent()}
                </table>
            </div>
        );
    }

} export default Contact;
