export const formatCurrency = (amount, currency = "₹") => {
  return `${currency}${Number(amount).toLocaleString('en-IN')}`;
};

export const calculate1RM = (weight, reps) => {
  const w = parseFloat(weight);
  const r = parseFloat(reps);
  if (!w || !r || r < 1) return 0;
  if (r === 1) return Math.round(w);
  // Epley formula: 1RM = Weight * (1 + Reps/30)
  return Math.round(w * (1 + r / 30));
};

export const calculateMacros = ({ weight, goal, activityLevel, bodyType }) => {
  const w = parseFloat(weight);
  if (!w) return null;

  // Base BMR estimate (Harris-Benedict simplified)
  let baseCalories = w * 22; // baseline kcal/kg

  // Activity multiplier
  const mults = {
    sedentary: 1.2,
    moderate: 1.45,
    intense: 1.7,
    elite: 1.9
  };
  const act = mults[activityLevel] || 1.45;
  let tdee = baseCalories * act;

  // Goal adjustment
  if (goal === "cut") tdee -= 500;
  if (goal === "bulk") tdee += 400;

  tdee = Math.round(tdee);

  // Protein: 2.2g per kg
  const proteinGrams = Math.round(w * 2.2);
  const proteinKcal = proteinGrams * 4;

  // Fats: 25% of total calories
  const fatKcal = tdee * 0.25;
  const fatGrams = Math.round(fatKcal / 9);

  // Carbs: Remaining calories
  const carbKcal = Math.max(0, tdee - proteinKcal - fatKcal);
  const carbGrams = Math.round(carbKcal / 4);

  return {
    calories: tdee,
    protein: proteinGrams,
    carbs: carbGrams,
    fats: fatGrams
  };
};
