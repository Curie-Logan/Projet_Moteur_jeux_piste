import React from 'react';

import './Timetable.css';

class Timetable extends React.Component{
    constructor(props){
        super(props);
        this.hours = props.hours;
    }

    render(){
        let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        let timetable = [];
        let nbCols = this.hours[0].length;
        
        for(let i = 0; i < this.hours.length; ++i){
            if(this.hours[i].length > nbCols){
                nbCols = this.hours[i].length;
            }

            let cells = [];

            if(this.hours[i].length){
                for(let hour of this.hours[i]){
                    let h = <td>{hour}</td>
                    cells.push(h);
                }
            }else{
                let h = <td colSpan={nbCols}>FERMÉ</td>
                cells.push(h);
            }
            

            let row = 
            <tr>
                <td>{days[i]}</td>
                {cells}
            </tr>;
            timetable.push(row);
        }

        return(
            <table id='timetable'>
                <tbody>
                    {timetable}
                </tbody>
            </table>
            
        );
    }

} export default Timetable;
