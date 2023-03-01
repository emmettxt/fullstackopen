import Part from "./Part";
import { CoursePart } from "./types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart, index) => (
        <Part coursePart={coursePart} key={index} />
      ))}
    </>
  );
};

export default Content;
