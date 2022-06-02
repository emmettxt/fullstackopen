import Person from './Person';

const Numbers = ({ persons }) => persons.map(
  person => <Person name={person.name} number={person.number} key={person.id} />
);
export default Numbers