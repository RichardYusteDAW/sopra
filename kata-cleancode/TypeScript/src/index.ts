// import { calc } from "./clean-code/ejercicio-cc";
import { calculate } from "./clean-code/calcutator";
import { IoperationData } from "./clean-code/IopertationData";

const data: IoperationData[] = [
  { num: 5, operation: "add" },
  { num: 3, operation: "multiply" },
  { num: 2, operation: "subtract" },
  { num: 4, operation: "divide" },
  { num: 10, operation: "add" },
  { num: 2, operation: "multiply" },
  { num: 5, operation: "custom" },
  { num: 3, operation: "multiply" },
  { num: 8, operation: "divide" },
  { num: 2, operation: "add" }
];

try {
  console.log("Resultado calculadora", calculate(5, data));
} catch (error) {
  console.log((error as Error).message);
}