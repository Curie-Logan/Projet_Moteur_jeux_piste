import React from 'react';

import './Contact.css';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.contact = this.props.coordonnees;
    }

    render(){
        let phone = (this.contact.telephone)? <p>Téléphone : <a href="tel:{this.contact.telephone}">{this.contact.telephone}</a></p>: '';
        let mail = (this.contact.mail)? <p>Mail : <a href="mailto:{this.contact.mail}">{this.contact.mail}</a></p>: '';
        let web = (this.contact.web)? <p><a href="this.contact.web">site internet</a></p>:'';

        return(
            <div id='contact'>
                {phone}
                {mail}
                {web}
            </div>
        );
    }

} export default Contact;
