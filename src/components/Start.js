import React from "react";
import "./Start.css";

export class Start extends React.Component{
    render(){
        let buttons = this.props.categories.map(category => {
            return <button key={category.id} onClick={()=>this.props.onStart(category.id)}>
                    {category.name}
                    </button>;  
          });
        return (
            <section className='start'>
                <header>Welcome to the quiz!</header>
                <div>
                    You are welcome to press one of the topics below and test your knowledge.
                </div>
                <nav>
                    {buttons}
                </nav>
            </section>
        );
    }
}