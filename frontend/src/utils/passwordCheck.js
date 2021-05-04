const passwordCheck = (pass) => {
  let score = 0;
  if (!pass) return score;

  // award every unique letter until 5 repetitions
  const letters = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (let check in variations) {
    variationCount += variations[check] === true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  const result = parseInt(score);

  if (result > 80) return "strong";
  if (result > 60) return "good";
  if (result >= 30) return "weak";
  if (result > 0 && result < 30) return "Too Weak";

  return;
};

export default passwordCheck;
