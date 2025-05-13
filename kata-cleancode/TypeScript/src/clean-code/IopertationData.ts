import * as operations from './operations';


export interface IoperationData {
    num: number;
    operation: keyof typeof operations;
}