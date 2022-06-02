const Filter = (props) => <div>
  filter shown with
  <input value={props.filter} onChange={props.handleFilter}></input>
</div>;
export default Filter