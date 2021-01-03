import React from "react";
import {  Quiz } from "../Quiz";
import { Start } from "./Start";
import { Question } from "./Question";
import { End } from "./End";

export  class QuizUI extends React.Component{
    //
    constructor(props){
        super(props);
        this.quiz = new Quiz();
        this.state = {event : 'start'};
        //
        this.onAnswer = this.onAnswer.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }
    //
    onAnswer(id,answer){
        this.quiz.answerQuestion(id,answer);
        this.setState({event:this.quiz.event })
    }
    //
    onStart(){      
        this.quiz.startQuiz();
        this.setState( {event : this.quiz.event});
    }
    //
    onNext(){
        if(this.quiz.nextQuestion())
            this.setState( {event : this.quiz.event});
    }
    //
    onPrevious(){
        if(this.quiz.previousQuestion())
            this.setState({event:this.quiz.event});        
    }
    //
    onEnd(){
        this.quiz.endQuiz();
        this.setState({event:this.quiz.event}); 
    }
    //
    render(){
        let quiz = this.quiz;        
        let questionIndex = quiz.questionIndex;
        let nextFunction = questionIndex === quiz.questions.length-1 ? undefined : this.onNext;
        let previousFunction = questionIndex === 0 ? undefined : this.onPrevious;
        switch (this.state.event) {
            case undefined:
            case 'start':
                return <Start onStart={this.onNext}/>;
            case 'answer':
            case 'next':
            case 'previous':
                let selectedQuestion = quiz.getCurrentQuestion();
                let selectedAnswer = quiz.getCurrentAnswer();
                return <Question question={selectedQuestion} answer={selectedAnswer} onAnswer={this.onAnswer}
                                 onStart={this.onStart} onNext={nextFunction} onPrevious={previousFunction} onEnd={this.onEnd}/>;
            case 'end':
                let {correct,incorrect,unanswered} = this.quiz.answersSummery;
                return <End correct={correct} incorrect={incorrect} unanswered={unanswered}
                            onStart={this.onStart} />;                
            default:
                break;
        }
    }
}