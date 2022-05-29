import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Statistics = ({good,neutral,bad}) =>{
  if (good == 0 && neutral ==0 && bad == 0){
    return(
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }else{
    return(
      <div>
        <h1>statistics</h1>
        <div> good: {good}</div>
        <div> neutral: {neutral}</div>
        <div> bad: {bad}</div>
        <div> all: {good+neutral+bad}</div>
        <div> average: {(good - bad)/(good+neutral+bad)}</div>
        <div> positive: {100*good/(good+neutral+bad)}%</div>
      </div>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (feedback) => {
    switch (feedback) {
      case 'good':
        return () => setGood(good + 1)
      case 'neutral':
        return () => setNeutral(neutral + 1)
      case 'bad':
        return () => setBad(bad + 1)
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleClick('good')} />
      <Button text='neutral' handleClick={handleClick('neutral')} />
      <Button text='bad' handleClick={handleClick('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App