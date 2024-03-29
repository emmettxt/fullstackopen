import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"
const Filter = ({setFilter}) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault()
    setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
// const mapDispatchToProps ={setFilter}
export default connect(null, { setFilter })(Filter)