export  class Quiz{
    //
    constructor(){        
        this.answerQuestion = this.answerQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.endQuiz = this.endQuiz.bind(this);
        this.getCurrentAnswer= this.getCurrentAnswer.bind(this);
        this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
        this.getAnswersSummery = this.getAnswersSummery.bind(this);
        this.tick = this.tick.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        //
        this.startQuiz();
    }
    //
    startQuiz(){
        this.questions =[{id:1,text:'does the sun shines at night?',answer:false},
                        {id:2,text:'does copper considered a good conductor?',answer:true},
                        {id:3,text:'vanila js is a js framework?',answer:false},
                        {id:4,text:'does js needs to compile before excuting?',answer:false}];
        this.answers = this.questions.map((q)=>{
            return {id:q.id,answer:undefined};
        }) ;        
        this.answersSummery={};     
        this.seconds =0;                  
        this.questionIndex = -1;
        this.event = 'start';
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
    endQuiz(){
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
                if(q.answer==a.answer)
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