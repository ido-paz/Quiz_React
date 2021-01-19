export function getAllCategories() {
    return [{id:1,name:'JavaScript'},{id:2,name:'C#'},{id:3,name:'SQL'},{id:4,name:'HTML'}];
}
export function getAllQuestions() {
    return [{id:1,text:'VAR is a valid variable declaration?',answer:false},
            {id:2,text:'Javascript can be used in client and server side programming?',answer:true},
            {id:3,text:'Vanila js is a js framework?',answer:false},
            {id:4,text:'Does js needs to compile before excuting?',answer:false},
            {id:5,text:'C# created by Microloft?',answer:false},
            {id:6,text:'C# has automatic garbage collection ?',answer:true},
            {id:7,text:'SQL means standard query language?',answer:true},
            {id:8,text:'SQL is used only to retrieve data from database ?',answer:false},
            {id:9,text:'HTML means hyper text markup language?',answer:true},
            {id:10,text:'HTML to declare loops and variables?',answer:false},
            ];        
}
//
export function getAllQuestions_Categories() {
    return [{questionID:1,categoryID:1},{questionID:2,categoryID:1},{questionID:3,categoryID:1},{questionID:4,categoryID:1},
            {questionID:5,categoryID:2},{questionID:6,categoryID:2},
            {questionID:7,categoryID:3},{questionID:8,categoryID:3},
            {questionID:9,categoryID:4},{questionID:10,categoryID:4}];
}
//
export function getCategoryQuestions(categoryID) {
    let questionIDs = getAllQuestions_Categories().filter(qc=>qc.categoryID===categoryID).map(qc=>qc.questionID);
    return getAllQuestions().filter(q=>questionIDs.includes(q.id))
}
