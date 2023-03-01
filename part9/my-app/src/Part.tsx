import { CoursePart } from "./types";

const PartDetails = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return <p>{coursePart.description}</p>;
    case "background":
      return (
        <>
          <p>{coursePart.description}</p>
          <p>{coursePart.backroundMaterial}</p>
        </>
      );
    case "group":
      return <p>Project exercises {coursePart.groupProjectCount}</p>;
    case "special":
      return (
        <>
          <p>{coursePart.description}</p>
          <p>required skills: {coursePart.requirements.toString()}</p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <div>
      <h3>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      <PartDetails coursePart={coursePart} />
    </div>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
