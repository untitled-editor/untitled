import React,{Component} from 'react'

let interval

export default class CountdownTimer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeRemaining: this.timeRemaining(props.endDate)
        }
    }

    timeRemaining(endDate) {
        return endDate - Math.floor(Date.now()/1000)
    }

    formatTime(time) {
        let hours   = Math.floor(time / 3600)
        let minutes = Math.floor((time - (hours * 3600)) / 60)
        let seconds = time - (hours * 3600) - (minutes * 60)

        if (hours   < 10) hours   = "0"+hours
        if (minutes < 10) minutes = "0"+minutes
        if (seconds < 10) seconds = "0"+seconds
        return `${hours}:${minutes}:${seconds}`
    }
    

    componentWillMount() {
        interval = setInterval(_ => (
            this.setState({
                timeRemaining: this.timeRemaining(this.props.endDate)
            })
        ), 1000)
    }

    componentWillUnmount() {
        clearInterval(interval)
    }

    render() {
        return <h1 style={{
            color: 'red'
        }}>{this.formatTime(this.state.timeRemaining)} remaining!</h1>
    }
}