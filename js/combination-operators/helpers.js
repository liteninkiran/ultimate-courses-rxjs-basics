export function calculateMortgage(interest, loanAmount, loanLength) {
    const calculatedInterest = interest / 1200;
    const numerator = loanAmount * calculatedInterest;
    const denominator = 1 - Math.pow(1 / (1 + calculatedInterest), loanLength);
    const total = numerator / denominator;
    return total.toFixed(2);
}
