import React from "react";
import "./Start.css";

export class Start extends React.Component{
    render(){
        return (
            <section className='start'>
                <header>Welcome to the quiz!</header>
                <div>
                    in this quiz you are welcome to test your knowledge
                </div>
                <nav>
                    <button onClick={this.props.onStart}>Start</button>
                </nav>
            </section>
        );
    }
}