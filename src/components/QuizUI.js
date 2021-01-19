import React from "react";
import {  Quiz } from "../Quiz";
import { Start } from "./Start";
import { Question } from "./Question";
import { End } from "./End";

export  class QuizUI extends React.Component{
    //
    constructor(props){
        super(props); 
        //   
        this.quiz = new Quiz();
        this.state = {event : 'start'};    
        //
        this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
        this.onInitialize = this.onInitialize.bind(this);
        this.onNextQuestion = this.onNextQuestion.bind(this);
        this.onPreviousQuestion = this.onPreviousQuestion.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onEnd = this.onEnd.bind(this);
        //
        this.quiz.initialize();
    }
    //
    onAnswerQuestion(id,answer){
        this.quiz.answerQuestion(id,answer);
        this.setState({event:this.quiz.event })
    }
    //
    onInitialize(){           
        this.quiz.initialize();
        this.setState( {event : this.quiz.event});
    }
    //
    onStart(categoryID){
        this.quiz.start(categoryID);
        if(this.quiz.nextQuestion())
            this.setState( {event : this.quiz.event});
    }
    //
    onNextQuestion(){
        if(this.quiz.nextQuestion())
            this.setState( {event : this.quiz.event});
    }
    //
    onPreviousQuestion(){
        if(this.quiz.previousQuestion())
            this.setState({event:this.quiz.event});        
    }
    //
    onEnd(){
        this.quiz.end();
        this.setState({event:this.quiz.event}); 
    }
    //
    render(){
        let quiz = this.quiz;        
        let questionIndex = quiz.questionIndex;
        switch (this.state.event) {
            case undefined:
            case 'start':
                return <Start categories={quiz.categories} onStart={this.onStart}/>;
            case 'answer':
            case 'next':
            case 'previous':
                let nextFunction = questionIndex === quiz.questions.length-1 ? undefined : this.onNextQuestion;
                let previousFunction = questionIndex === 0 ? undefined : this.onPreviousQuestion;
                let selectedQuestion = quiz.getCurrentQuestion();
                let selectedAnswer = quiz.getCurrentAnswer();
                return <Question question={selectedQuestion} answer={selectedAnswer} onAnswer={this.onAnswerQuestion}
                                 onStart={this.onInitialize} onNext={nextFunction} onPrevious={previousFunction} 
                                 onTimerStop={this.onTimerStop} onEnd={this.onEnd}/>;
            case 'end':
                let {correct,incorrect,unanswered} = this.quiz.answersSummery;
                return <End correct={correct} incorrect={incorrect} unanswered={unanswered}
                            elapsedSeconds={this.quiz.seconds} onStart={this.onInitialize} />;                
            default:
                break;
        }
    }
}