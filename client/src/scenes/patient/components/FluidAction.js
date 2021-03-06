/**
 * Created by cbrenneisen on 5/7/17.
 */

import React, { Component } from 'react';
import './style/FluidAction.css';

export default class FluidAction extends Component {
    constructor(props){
        super(props);

        this.state = {
            score: 0,
            npo: false,
            burn: false,
            brain: false,
            resuscitation: false,
            shock: false,
            keystones: false,
            diabetic: false
        };
    }
    componentWillUnmount(){
        this.props.patient.score.unsubscribe();
        this.props.patient.npo.unsubscribe();
        this.props.patient.burn.unsubscribe();
        this.props.patient.traumatic_brain.unsubscribe();
        this.props.patient.shock.unsubscribe();
        this.props.patient.traumatic_resuscitation.unsubscribe();
        this.props.patient.keystones.unsubscribe();
        this.props.patient.diabetic.unsubscribe();
    }
    componentWillMount(){
        this.props.patient.score.subscribe((x) => {
            this.setState ({
                score: x
            });
        });

        this.props.patient.npo.subscribe((x) => {
            this.setState ({
                npo: x
            });
        });

        this.props.patient.burn.subscribe((x) => {
            this.setState ({
                burn: x
            });
        });

        this.props.patient.traumatic_brain.subscribe((x) => {
            this.setState ({
                brain: x
            });
        });

        this.props.patient.shock.subscribe((x) => {
            this.setState ({
                shock: x
            });
        });

        this.props.patient.traumatic_resuscitation.subscribe((x) => {
            this.setState ({
                traumatic_resuscitation: x
            });
        });

        this.props.patient.keystones.subscribe((x) => {
            this.setState ({
                keystones: x
            });
        });

        this.props.patient.diabetic.subscribe((x) => {
            this.setState ({
                diabetic: x
            });
        });
    }
    render() {

        //TODO: add support for notes and going to the next screen

        let message = "No fluid needed. Reassess in 12 hrs";
        let type = "normal";

        if(this.state.burn){
            message = "No Fluid Maintenance Recommended Due to Burn";
            type = "warning"
        }else if(this.state.brain){
            message = "No Fluid Maintenance Recommended Due to Traumatic Brain Injury";
            type = "warning"
        }else if(this.state.shock){
            message = "No Fluid Maintenance Recommended Due to Shock";
            type = "warning"
        }else if(this.state.traumatic_resuscitation){
            message = "No Fluid Maintenance Recommended Due to Traumatic Resuscitation";
            type = "warning"
        }else if (this.state.diabetic) {
            message = "Consider DKA Protocol and insulin gtt with fluid replacement for dehydration"
        }else if (this.state.score >= 5) {
            message = "Low fluid volume. Consider Fluid Resuscitation"
        }else if (this.state.score < 5 && this.state.score >= 3){
            message = "Consider Maintenance IV Fluid"
        }

        return (
            <div id="fluid-action" className="row widget">
                <h4 className={type}>{message}</h4>
            </div>
        )

    }
}