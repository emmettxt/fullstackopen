import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const hook = () =>{
    axios
      .get('http://localhost:3003/persons')
      .then(response => setPersons(response.data))
  }
  useEffect(hook,[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  const handleAddName = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }


  }
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilter = {handleFilter}/>
      <h2>add a new</h2>
      <PersonForm
        newName = {newName}
        handleNewNameChange ={handleNewNameChange}
        newNumber ={newNumber}
        handleNewNumberChange ={handleNewNumberChange}
        handleAddName = {handleAddName}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App