/**
 * Created by cbrenneisen on 5/5/17.
 */

import React, { Component } from 'react';
import PatientRow from "./PatientRow";

import './style/PatientPicker.css';


export default class PatientPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curPatients: [],
            allPatients: []
        }
    }
    componentWillMount(){
        fetch("api/patients")
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                   curPatients: resp,
                   allPatients: resp
                });
            });
    }
    search(event){
        let keyword = event.target.value;

        //filter out of the original list of patients
        let newPatients = this.state.allPatients.filter(function(patient){
            return patient.name.toLowerCase().includes(keyword.toLowerCase())
        });

        this.setState ({
            curPatients: newPatients
        })

    }render() {

        return (
            <div id="patient-picker-wrapper">
              <input type="text" onChange={this.search.bind(this)}
                     className="form-control patient-search" placeholder="Search By Name..."
                     aria-describedby="sizing-addon2" />
              <div id="patient-picker">
                  <ul className="list-group">
                      {this.state.curPatients.map((patient) => {
                        return <PatientRow patient={patient} key={patient.mrn}/>
                      })}
                  </ul>
              </div>
            </div>
        );
    }
}