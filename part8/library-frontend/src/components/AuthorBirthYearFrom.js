import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorBirthYearForm = ({ authorsNames }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name, setBornTo: birthYear } })

    setName('')
    setBirthYear('')
  }
  const handleChange = (event) => {
    setName(event.target.value)
  }
  return (
    <div>
      <h2>Change Birth Year</h2>
      <form onSubmit={submit} value={name}>
        <select onChange={handleChange}>
          {authorsNames.map((name, index) => (
            <option value={name} key={index}>
              {name}
            </option>
          ))}
        </select>
        <div>
          Birth Year
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(Number(target.value))}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearForm
