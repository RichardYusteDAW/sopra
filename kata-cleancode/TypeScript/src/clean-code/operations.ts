export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => {
    if (b === 0) throw new Error("Cannot divide by zero.");
    return a / b;
};

export const custom = (a: number, b: number): number => a + b * 2;