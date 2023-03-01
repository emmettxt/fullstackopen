import express from "express";
import { calculatBmi, parseBmiCalculatorArguments } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (
    !height ||
    !weight ||
    typeof height !== "string" ||
    typeof weight !== "string"
  )
    return res.status(400).send({
      error: "malformatted parameters",
    });
  try {
    const bmi = calculatBmi(
      parseBmiCalculatorArguments(["", "", height, weight])
    );
    return res.send({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises)
    return res.status(400).send({ error: "paramaters missing" });
  if (!target || isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const dailyExerciseHours: number[] = [];
  for (const dailyHours of daily_exercises) {
    if (isNaN(Number(dailyHours))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
    dailyExerciseHours.push(Number(dailyHours));
  }
  const responseBody = calculateExercises({
    dailyExerciseHours,
    target: target as number,
  });
  return res.send(responseBody);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
