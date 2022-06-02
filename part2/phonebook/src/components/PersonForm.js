const PersonForm = (props) => 
<form>
<div>
  name: <input value={props.newName} onChange={props.handleNewNameChange} />
</div>
<div>
  number: <input value={props.newNumber} onChange={props.handleNewNumberChange} />
</div>
<div>
  <button type="submit" onClick={props.handleAddName}>add</button>
</div>
</form>

export default PersonForm