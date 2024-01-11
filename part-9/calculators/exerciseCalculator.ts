import express from "express";

const app = express();

app.use(express.json());

interface isNotNumberResult {
  numArgs: number[];
  targetArgs: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const isNotNumber = (args: string[]): isNotNumberResult => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 10) throw new Error("Too many arguments");

  const numbers: number[] = [];

  args.forEach((a) => {
    if (isNaN(Number(a))) {
      throw new Error("Provided values were not numbers!");
    } else {
      numbers.push(Number(a));
    }
  });

  const exerciseDays = numbers.slice(0, -1);
  const targetDays = Number(numbers.at(-1));

  return { numArgs: exerciseDays, targetArgs: targetDays };
};

const calculateExercises = (days: number[], targetDays: number): Result => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((v) => v > 0).length;
  const success: boolean = periodLength === trainingDays;

  const trainingPercentage: number = (trainingDays / periodLength) * 100;
  let rating: number;
  let ratingDescription: string;

  if (trainingPercentage <= 30) {
    rating = 1;
    ratingDescription =
      "Needs Improvement: There are notable issues that need attention for a better experience. Significant improvements are necessary to meet expectations.";
  } else if (trainingPercentage >= 90) {
    rating = 3;
    ratingDescription =
      "Impressive: Outstanding performance that exceeds expectations. Excellent in every aspect, leaving little to no room for improvement.";
  } else {
    rating = 2;
    ratingDescription =
      "Fairly Good: It's alright but has room for improvement to make it more satisfying. Decent, yet could be better with some enhancements.";
  }

  const target: number = targetDays;
  const average: number =
    days.reduce((acc, val) => acc + val, 0) / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { numArgs, targetArgs } = isNotNumber(process.argv.slice(2));
  console.log(calculateExercises(numArgs, targetArgs));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const result = calculateExercises(
    daily_exercises as number[],
    Number(target)
  );

  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
