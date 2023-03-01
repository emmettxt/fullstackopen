import { CoursePart } from "./types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const totalNumberOfExercises = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalNumberOfExercises}</p>;
};

export default Total;
