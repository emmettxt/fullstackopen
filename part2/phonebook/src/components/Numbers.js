import Person from './Person';

const Numbers = ({ persons, deletePerson }) => 
  persons.map(person => 
    <Person 
      name={person.name} 
      number={person.number} 
      deletePerson ={deletePerson(person)}
      key={person.id} 
    />
);
export default Numbers