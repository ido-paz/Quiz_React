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
        this.onAnswerQuestion = this.onAnswerQuestion.bind(this);
        this.onStartQuiz = this.onStartQuiz.bind(this);
        this.onNextQuestion = this.onNextQuestion.bind(this);
        this.onPreviousQuestion = this.onPreviousQuestion.bind(this);
        this.onEndQuiz = this.onEndQuiz.bind(this);
    }
    //
    onAnswerQuestion(id,answer){
        this.quiz.answerQuestion(id,answer);
        this.setState({event:this.quiz.event })
    }
    //
    onStartQuiz(){      
        this.quiz.startQuiz();
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
    onEndQuiz(){
        this.quiz.endQuiz();
        this.setState({event:this.quiz.event}); 
    }
    //
    render(){
        let quiz = this.quiz;        
        let questionIndex = quiz.questionIndex;
        let nextFunction = questionIndex === quiz.questions.length-1 ? undefined : this.onNextQuestion;
        let previousFunction = questionIndex === 0 ? undefined : this.onPreviousQuestion;
        switch (this.state.event) {
            case undefined:
            case 'start':
                return <Start onStart={this.onNextQuestion}/>;
            case 'answer':
            case 'next':
            case 'previous':
                let selectedQuestion = quiz.getCurrentQuestion();
                let selectedAnswer = quiz.getCurrentAnswer();
                return <Question question={selectedQuestion} answer={selectedAnswer} onAnswer={this.onAnswerQuestion}
                                 onStart={this.onStartQuiz} onNext={nextFunction} onPrevious={previousFunction} 
                                 onTimerStop={this.onTimerStop} onEnd={this.onEndQuiz}/>;
            case 'end':
                let {correct,incorrect,unanswered} = this.quiz.answersSummery;
                return <End correct={correct} incorrect={incorrect} unanswered={unanswered}
                            elapsedSeconds={this.quiz.seconds} onStart={this.onStartQuiz} />;                
            default:
                break;
        }
    }
}