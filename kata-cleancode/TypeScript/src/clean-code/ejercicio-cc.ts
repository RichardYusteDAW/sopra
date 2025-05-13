function op(a: any, b: any, operation: any): any {
  switch (operation) {
    case "a":
      return a + b;
    case "s":
      return a - b;
    case "m":
      return a * b;
    case "d":
      if (b !== 0) {
        return a / b;
      } else {
        console.error("Error: Cannot divide by zero.");
        return a;
      }
    default:
      console.error("Error: Invalid operation.");
      return a;
  }
}

export function calc(num: any): any {
  let res = num;

  res = op(res, 5, "a");
  res = op(res, 3, "m");
  res = op(res, 2, "s");
  res = op(res, 4, "d");

  res = op(res, 10, "a");
  res = op(res, 2, "m");

  const custom = (a: any, b: any) => a + b * 2;
  res = custom(res, 5);

  res = op(res, 3, "m");
  res = op(res, 8, "d");
  res = op(res, 2, "a");

  return res;
}