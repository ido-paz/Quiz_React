import React from "react";
import { getFormatedTime } from "../Utils";
import   "./Timer.css";

export class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state= {seconds:0};
        this.handler = null;
        this.onStop = props.onStop;
        this.tick = this.tick.bind(this);
    }
    //
    componentDidMount(){
        this.handler = setInterval(this.tick,1000);
        console.log(this.handler);
    }
    //
    tick(){
        let seconds = parseInt(this.state.seconds)+1;
        this.setState({seconds:seconds});
    }
    //
    componentWillUnmount(){
        clearInterval(this.handler);
        if(this.onStop !== undefined)
            this.onStop(getFormatedTime(this.state.seconds));
    }
    //
    render(){
        let {hours,minutes,seconds} = getFormatedTime(this.state.seconds);
        return <span className="timer">
                    {hours}:{minutes}:{seconds}
                </span>
    }
}   