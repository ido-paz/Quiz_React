import React from "react";

export class Start extends React.Component{
    render(){
        return (
            <section>
                <header>Welcome to the trivia game!</header>
                <content>
                    in this game you are welcome to test your knowledge
                    <br/>
                    <button onClick={this.props.onStart}>Start</button>
                </content>
            </section>
        );
    }
}