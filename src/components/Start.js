import React from "react";

export class Start extends React.Component{
    render(){
        return (
            <section>
                <header>Welcome to the quiz!</header>
                <content>
                    in this quiz you are welcome to test your knowledge
                    <br/>
                    <button onClick={this.props.onStart}>Start</button>
                </content>
            </section>
        );
    }
}