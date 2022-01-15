import React from 'react';

import './Contact.css';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.contact = this.props.coordonnees;
    }

    render(){
        let phone = (this.contact.telephone)? [<img src='./img/map/placeInfo/contact/phone.png'/>, <p>Téléphone : <a href="tel:{this.contact.telephone}">{this.contact.telephone}</a></p>] : '';
        let mail = (this.contact.mail)? [<img src='./img/map/placeInfo/contact/email.png'/>, <p>Mail : <a href="mailto:{this.contact.mail}">{this.contact.mail}</a></p>] : '';
        let web = (this.contact.web)? [<img src='./img/map/placeInfo/contact/web.png'/>, <p><a href="this.contact.web">site internet</a></p>] : '';

        return(
            <div id='contact'>
                {phone}
                {mail}
                {web}
            </div>
        );
    }

} export default Contact;
