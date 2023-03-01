interface BMIInputs {
  height: number;
  weight: number;
}

export const parseBmiCalculatorArguments = (args: string[]): BMIInputs => {
  if (args.length < 4) throw new Error("Not enough arguemnts");
  if (args.length > 4) throw new Error("Too many arguemnts");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height))
    throw new Error(`Provided heigth value "${args[2]}" is not a number`);
  if (isNaN(weight))
    throw new Error(`Provided weight value "${args[3]}" is not a number`);

  return { height, weight };
};

export const calculatBmi = (BMIInputs: BMIInputs): string => {
  const { height, weight } = BMIInputs;
  if (height <= 0) throw new Error("height must be greater than zero");
  if (weight <= 0) throw new Error("weight must be greater than zero");

  const ranges = [
    { class: "Underweight (Severe thinness)", upperLimit: 16.0 },
    {
      class: "Underweight (Moderate thinness)",
      upperLimit: 17,
    },
    {
      class: "Underweight (Mild thinness)",
      upperLimit: 18.4,
    },
    { class: "Normal (healthy weight)", upperLimit: 25 },
    { class: "Overweight (Pre-obese)", upperLimit: 30 },
    { class: "Obese (Class I)", upperLimit: 35 },
    { class: "Obese (Class II)", upperLimit: 40 },
    { class: "Obese (Class III)", upperLimit: Infinity },
  ];

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  for (const range of ranges) {
    if (bmi < range.upperLimit) {
      return range.class;
    }
  }
  return ranges.slice(-1)[0].class;
};

// try {
//   const userInput = parseBmiCalculatorArguments(process.argv);
//   console.log(calculatBmi(userInput));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
