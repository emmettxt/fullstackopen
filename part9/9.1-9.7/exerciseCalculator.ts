interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateExercisesInput {
  dailyExerciseHours: number[];
  target: number;
}

export const parseExerciseCalculatorArguments = (
  args: string[]
): CalculateExercisesInput => {
  if (args.length < 4) throw new Error("Not enough arguemnts");

  const target = Number(args[2]);

  if (isNaN(target))
    throw new Error(`Provided target value "${args[2]}" is not a number`);

  const dailyExerciseHoursStrings = args.slice(3);
  const dailyExerciseHours: number[] = [];

  for (const dailyHoursString of dailyExerciseHoursStrings) {
    const dailyHoursNumber = Number(dailyHoursString);

    if (isNaN(dailyHoursNumber))
      throw new Error(
        `Provided daily exercise hours value ${dailyHoursString} is not a number`
      );

    dailyExerciseHours.push(dailyHoursNumber);
  }
  return { dailyExerciseHours, target };
};

export const calculateExercises = (
  calculateExercisesInput: CalculateExercisesInput
): Result => {
  const { dailyExerciseHours, target } = calculateExercisesInput;
  const ratings = [
    { rating: 1, ratingDescription: "needs improvement" },
    { rating: 2, ratingDescription: "not too bad but could be better" },
    { rating: 3, ratingDescription: "fantastic" },
  ];
  const totalHours = dailyExerciseHours.reduce(
    (total, time) => total + time,
    0
  );

  const average = totalHours / dailyExerciseHours.length;
  
  let rating;
  if (average < target * 0.75) rating = ratings[0];
  else if (average >= target) rating = ratings[2];
  else rating = ratings[1];

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((hours) => hours > 0).length,
    success: totalHours >= target * dailyExerciseHours.length,
    ...rating,
    target,
    average,
  };
};

// try {
//   const calculateExercisesInput = parseExerciseCalculatorArguments(
//     process.argv
//   );
//   console.log(calculateExercises(calculateExercisesInput));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
