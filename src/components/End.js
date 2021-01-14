import React from "react";

export class End extends React.Component{
    render(){
        let {correct,incorrect,unanswered} = this.props;
        return (
            <section className="end">
                <header>The quiz has ended</header>
                <div>
                    you have answered correctly {correct} out of {correct + incorrect + unanswered} questions
                </div>
                <nav>
                    <button onClick={this.props.onStart}>Start again</button>
                </nav>
            </section>
        );
    }
}