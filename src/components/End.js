import React from "react";

export class End extends React.Component{
    render(){
        let {correct,incorrect,unanswered} = this.props;
        return (
            <section>
                <header>The quiz has ended</header>
                <content>
                    you have answered correctly {correct} out of {correct + incorrect + unanswered} questions
                    <br/>
                    <button onClick={this.props.onStart}>Start again</button>
                </content>
            </section>
        );
    }
}