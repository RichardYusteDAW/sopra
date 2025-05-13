declare module 'str-utils' {
    // export const ...
    // export function ...
    type StrUtil = (input: string) => string;

    const strReverse: StrUtil;
    const strToLower: StrUtil;
    const strToUpper: StrUtil;
    const strRandomize: StrUtil;
    const strInvertCase: StrUtil;
}