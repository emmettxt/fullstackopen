import { useState, useEffect } from 'react'
import Weather from './components/Weather'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) =>
  <div>
    find countries <input value={filter} onChange={handleFilterChange}></input>
  </div>
const Country = ({ country, show }) =>
  <div>
    {country.name.common}
    <button onClick={show}>Show</button>
  </div>
const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {country.capital[0]}<div />
        area {country.area}
      </div>
      <h2>Languages: </h2>
      <ul>
        {Object.entries(country.languages).map(([lk, ln]) => <li key={lk}>{ln}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt={'flag of ' + country.name.common}></img>
      </div>
      <Weather
        city={country.capital[0]}
        latlng={country.capitalInfo.latlng}
      />
    </div>
  )
}
const Countries = ({ countries, setCountries }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }
  else if (countries.length > 10) {
    return <div>Too many match specify another filter</div>
  } else {
    return countries.map(country =>
      <Country
        country={country}
        show={() => setCountries([country])}
        key={country.ccn3} />
    )
  }


}
const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] =useState([])
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    let lowerfilter = event.target.value.toLowerCase()
    setCountries(
      allCountries.filter(country => 
        country.name.official.toLowerCase().includes(lowerfilter) || 
        country.name.common.toLowerCase().includes(lowerfilter)
    ))
  }
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all/')
      .then(response => 
        setAllCountries(
          response.data
        )

      )
  }
  useEffect(hook, [])
  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App;
