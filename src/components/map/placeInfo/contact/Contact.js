import React from 'react';

import './Contact.css';

class Contact extends React.Component{
    render(){
        let phone = (this.props.coordonnees.telephone)? [<img src='./img/map/placeInfo/contact/phone.png'alt=''/>, <p>Téléphone : <a href={"tel:"+this.props.coordonnees.telephone} data-rel="external">{this.props.coordonnees.telephone}</a></p>, <br/>] : '';
        let mail = (this.props.coordonnees.mail)? [<img src='./img/map/placeInfo/contact/email.png' alt=''/>, <p>Mail : <a href={"mailto:"+this.props.coordonnees.mail}>{this.props.coordonnees.mail}</a></p>, <br/>] : '';
        let web = (this.props.coordonnees.web)? [<img src='./img/map/placeInfo/contact/web.png' alt=''/>, <p><a href={this.props.coordonnees.web}>site internet</a></p>, <br/>] : '';

        return(
            <div id='contact'>
                {phone}
                {mail}
                {web}
            </div>
        );
    }

} export default Contact;
