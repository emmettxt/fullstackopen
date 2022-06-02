const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>;
const TotalExercises = ({ total }) => <b>total of {total} exercises</b>;
const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id} />)}
  </>;
const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <TotalExercises total={total} />
    </div>
  );
};

export default Course
