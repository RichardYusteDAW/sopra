import { IoperationData } from './IopertationData';
import * as operations from './operations';


export const calculate = (initialValue: number, data: IoperationData[]): number => {

    let result = initialValue;

    data.forEach(step => {

        const operationFn = operations[step.operation];

        try {
            result = operationFn(result, step.num);
        } catch (error) {
            if ((error as Error).message === "Cannot divide by zero.") throw error;

            throw new Error("Error: Invalid operation.");
        }
    });

    return result;
}