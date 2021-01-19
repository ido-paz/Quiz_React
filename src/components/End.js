import React from "react";
import { getFormatedTime } from "../Utils";

export class End extends React.Component{
    render(){
        let {correct,incorrect,unanswered} = this.props;
        let  {hours,minutes,seconds} = getFormatedTime(this.props.elapsedSeconds)
        return (
            <section className="end">
                <header>The quiz has ended</header>
                <div>
                    You have answered correctly {correct} of {correct + incorrect + unanswered} questions <br/>
                     in {hours}:{minutes}:{seconds}
                </div>
                <nav>
                    <button onClick={this.props.onStart}>Start again</button>
                </nav>
            </section>
        );
    }
}