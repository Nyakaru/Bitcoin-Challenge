interface CheckPrime {
  totalPrime: Boolean;
  total: number;
  nums: string;
}
export const checkPrime = (num: number): Boolean => {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};

export const checkTotalPrime = (arr: Array<number>): CheckPrime => {
  let total = 0;
  let nums: Array<number> = [];
  arr.forEach(function (element) {
    const isPrime = checkPrime(element);
    if (isPrime) {
      total = total + element;
      nums.push(element);
    } else {
    }
  });

  const totalPrime = checkPrime(total);
  return {
    totalPrime: totalPrime,
    total: total,
    nums: nums.join(","),
  };
};
