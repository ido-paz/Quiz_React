import React from "react";
import { Timer } from "./Timer";

export class Question extends React.Component{
    //
    constructor(props){
        super(props);
    }    
    //
    render(){
        let {text} = this.props.question;
        let {id,answer} = this.props.answer;
        let pf = this.props.onPrevious;
        let nf = this.props.onNext;
        let yes_answer = answer != undefined && answer === true?true:false;
        let no_answer =  answer != undefined && answer === false?true:false;
        return (
            <section className="question">
                <header>{text}</header>
                <div>
                    <input type="radio" id="no_radio" name="answers" 
                        onChange={()=>{this.props.onAnswer(id,false)}} checked={no_answer}/>No
                    <br/>  
                    <input type="radio" id="yes_radio" name="answers" 
                        onChange={()=>{this.props.onAnswer(id,true)}} checked={yes_answer}/>Yes                
                </div>                
                <nav>
                    <button onClick={this.props.onStart}>Start</button>|
                    <button onClick={pf} disabled={pf === undefined? true : false}>Previous</button>|
                    <Timer />|
                    <button onClick={nf} disabled={nf === undefined? true : false}>Next</button>|
                    <button onClick={this.props.onEnd}>End</button>
                </nav>
            </section>
        );
    }
}