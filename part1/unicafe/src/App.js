import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const StatisticsLine = ({text, value}) =>{
  return(
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
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
        <table>
          <tbody>
          <StatisticsLine text='good' value={good}/>
          <StatisticsLine text='neutral' value={neutral}/>
          <StatisticsLine text='bad' value={bad}/>
          <StatisticsLine text='all' value={good+neutral+bad}/>
          <StatisticsLine text='average' value={(good - bad)/(good+neutral+bad)}/>
          <StatisticsLine text='positive' value={ 100*good/(good+neutral+bad) +'%'}/>
          </tbody>
        </table>
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