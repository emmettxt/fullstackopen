import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const hook = () => {
    phonebookService
      .getAll()
      .then(phonebookData => setPersons(phonebookData))
  }
  useEffect(hook, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const setNotificationMessageWithTimeout = (message, isGood) => {
    setNotificationMessage(message)
    setNotificationIsGood(isGood)
    setTimeout(() => setNotificationMessage(null), 5000)
  }
  const [notificationIsGood, setNotificationIsGood] = useState(true)

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  const handleAddName = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const exisitngPerson = persons.find(p => p.name === newName)
    if (exisitngPerson) {
      if (window.confirm(`${newName} is already in the phone book, replace the old number wiht new one?`)) {

        phonebookService
          .update(exisitngPerson.id, personObject)
          .then(
            retunrnedPersonObject => {
              setPersons(persons.map(p => p.id !== exisitngPerson.id ? p : retunrnedPersonObject))
              setNotificationMessageWithTimeout(`Updated ${newName}`, true)
              setNewName('')
              setNewNumber('')

            }
          )
          .catch(err => setNotificationMessageWithTimeout(err.response.data.error, false))
      }
    } else {
      phonebookService
        .create(personObject)
        .then(returnedPersonObject => {
          setPersons(persons.concat(returnedPersonObject))
          setNotificationMessageWithTimeout(`Added ${newName}`, true)
          setNewName('')
          setNewNumber('')
        })
        .catch(err => setNotificationMessageWithTimeout(err.response.data.error, false))
    }


  }
  const deletePerson = (personToDelete) => () => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService
        .deletePerson(personToDelete.id)
        .then(_ => {
          setPersons(
            persons.filter(person => person.id !== personToDelete.id)
          )

          setNotificationMessageWithTimeout(`Deleted ${personToDelete.name}`, true)
        }).catch(_ => {
          setNotificationMessageWithTimeout(
            `Information of ${personToDelete.name} has already been removed from the server`,
            false
          )
          setPersons(
            persons.filter(person => person.id !== personToDelete.id)
          )
        })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isGood={notificationIsGood} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        handleAddName={handleAddName}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App