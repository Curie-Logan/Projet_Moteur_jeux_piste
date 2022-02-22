import React from 'react';

import './Timetable.css';

class Timetable extends React.Component{
    /**
     * Get the content of the timetable
     * @returns the timetable to display
     */
    getContent(){
        let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        let timetable = [];

        let nbCols = 1; //To adapt the colspan
        for(let i = 0; i < this.props.hours.length; ++i){
            if(this.props.hours[i].length > nbCols){
                nbCols = this.props.hours[i].length;
            }
        }

        for(let i = 0; i < this.props.hours.length; ++i){
            let cells = [];

            if(this.props.hours[i].length){
                for(let hour of this.props.hours[i]){
                    cells.push(
                        <td>
                            {hour}
                        </td>
                    );
                }
            }else{
                cells.push(
                    <td colSpan={nbCols}>
                        FERMÉ
                    </td>
                );
            }
            
            timetable.push(
                <tr>
                    <td>
                        {days[i]}
                    </td>
                    {cells}
                </tr>
            );
        }

        return timetable;
    }

    render(){
        return(
            <table id='timetable'>
                <tbody>
                    {this.getContent()}
                </tbody>
            </table>
        );
    }

} export default Timetable;
