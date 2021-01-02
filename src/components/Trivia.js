import React from "react";
import { Start } from "./Start";
import { Question } from "./Question";
import { End } from "./End";

export  class Trivia extends React.Component{
    //
    constructor(props){
        super(props);
        this.questions =[{id:1,text:'does the sun shines at night?',answer:false},
                         {id:2,text:'does copper considered a good conductor?',answer:true},
                         {id:3,text:'vanila js is a js framework?',answer:false},
                         {id:4,text:'does js needs to compile before excuting?',answer:false}];
        let answers = this.questions.map((q)=>{
            return {id:q.id,answer:undefined};
        }) ;                       
        this.state = {stage : 'start',answers:answers,questionIndex:undefined};
        //
        this.onAnswer = this.onAnswer.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }
    //
    onAnswer(id,answer){
        let answers = this.state.answers;
        console.log(id,answer);
        for (let index = 0; index < answers.length; index++) {
            let ua = answers[index];
            if (ua.id===id) {
                ua.answer = answer;
                break;
            }
        }
        this.setState({answers: answers})
    }
    //
    onStart(){      
        let answers = this.questions.map((q)=>{
            return {id:q.id,answer:undefined};
        }) ;                       
        this.setState( {stage : 'start',answers:answers,questionIndex:undefined});
    }
    //
    onNext(){
        let questionIndex = this.state.questionIndex !== undefined ? this.state.questionIndex :-1;
        if (questionIndex === this.questions.length - 1) 
            this.setState({stage:'end'});//it was the last question
        else
            this.setState({stage:'next', questionIndex:questionIndex+1});
    }
    //
    onPrevious(){
        let questionIndex = this.state.questionIndex;
        if (questionIndex > 0) 
            this.setState({stage:'previous',questionIndex: questionIndex-1});        
    }
    //
    onEnd(){
        let correct=0,incorrect=0,unanswered=0;
        for (let index = 0; index < this.questions.length; index++) {
            let q = this.questions[index];
            let a = this.state.answers[index];
            if (a) {
                if(q.answer==a.answer)
                    correct++;    
                else
                    incorrect++;
            }
            else
                unanswered++;            
        }
        this.setState({stage:'end',correct: correct,incorrect:incorrect,unanswered:unanswered});
    }
    //
    render(){
        let selectedQuestion = this.questions[this.state.questionIndex];
        let selectedAnswer = this.state.answers[this.state.questionIndex];
        let questionIndex = this.state.questionIndex;
        let nextFunction = questionIndex === this.questions.length-1?undefined:this.onNext;
        let previousFunction = questionIndex === 0 ?undefined:this.onPrevious;
        switch (this.state.stage) {
            case undefined:
            case 'start':
                return <Start onStart={this.onNext}/>;
            case 'next':
            case 'previous':
                return <Question question={selectedQuestion} answer={selectedAnswer} onAnswer={this.onAnswer}
                                 onStart={this.onStart} onNext={nextFunction} onPrevious={previousFunction} onEnd={this.onEnd}/>;
            case 'end':
                return <End correct={this.state.correct} incorrect={this.state.incorrect} 
                            unanswered={this.state.unanswered} onStart={this.onStart} />;                
            default:
                break;
        }
    }
}