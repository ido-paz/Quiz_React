import { getAllCategories,getCategoryQuestions } from "./DAL";
//
export  class Quiz{
    //
    constructor(){        
        this.answerQuestion = this.answerQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.end = this.end.bind(this);
        this.getCurrentAnswer= this.getCurrentAnswer.bind(this);
        this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
        this.getAnswersSummery = this.getAnswersSummery.bind(this);
        this.tick = this.tick.bind(this);
        this.initialize = this.initialize.bind(this);
        this.start = this.start.bind(this);
        //
        this.initialize();
    }
    //
    initialize(){
        this.categories = getAllCategories();
        //     
        this.answersSummery={};     
        this.seconds =0;                  
        this.questionIndex = -1;
        this.event = 'start';        
    }
    //
    start(categoryID){
        this.questions = getCategoryQuestions(categoryID);
        this.answers = this.questions.map((q)=>{
            return {id:q.id,answer:undefined};
        }) ;        
        this.timerHandler = setInterval(this.tick,1000);
    }
    //
    tick(){
        this.seconds = this.seconds + 1;
    }
    //
    answerQuestion(id,answer){
        let answers = this.answers;
        this.event = 'answer';
        console.log(id,answer);
        for (let index = 0; index < answers.length; index++) {
            let ua = answers[index];
            if (ua.id===id) {
                ua.answer = answer;
                break;
            }
        }
        return answers;
    }    
    //
    nextQuestion(){
        let questionIndex = this.questionIndex !== undefined ? this.questionIndex :-1;        
        if (questionIndex < this.questions.length - 1) 
        {
            this.event = 'next';
            this.questionIndex = questionIndex + 1;     
            return true;
        }
        return false;    
    }
    //
    previousQuestion(){
        let questionIndex = this.questionIndex;        
        if (questionIndex > 0) 
        {
            this.event = 'previous';
            this.questionIndex = questionIndex - 1;    
            return true;
        }
        return false;    
    }
    //
    end(){
        clearInterval(this.timerHandler);
        this.event = 'end';
        this.answersSummery = this.getAnswersSummery();
    }
    //
    getAnswersSummery(){
        let correct=0,incorrect=0,unanswered=0;        
        for (let index = 0; index < this.questions.length; index++) {
            let q = this.questions[index];
            let a = this.answers[index];
            if (a) {
                if(q.answer===a.answer)
                    correct++;    
                else
                    incorrect++;
            }
            else
                unanswered++;            
        }
        return {correct : correct , incorrect: incorrect , unanswered : unanswered};
    }
    //
    getCurrentAnswer(){
        return this.answers[this.questionIndex];
    }
     //
     getCurrentQuestion(){
        return this.questions[this.questionIndex];
    }
}