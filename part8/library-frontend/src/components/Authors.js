import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorBirthYearForm from './AuthorBirthYearFrom'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (authors.loading) return 'loading...'

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthYearForm
        authorsNames={authors.data.allAuthors.map((author) => author.name)}
      />
    </div>
  )
}

export default Authors
