import { isBlank, isStringMap, isType } from '@fundamental-ngx/cdk/utils';

export type ProviderParams = ReadonlyMap<string, any>;

/** @Hidden */
export function getMatchingStrategyStartsWithPerTermReqexp(value: string): RegExp {
    return new RegExp(`(\\s|^)(${value})`, 'gi');
}

/** @hidden */
export function objectValues(obj: any): any[] {
    return Object.keys(obj).map((key) => obj[key]);
}

/** @hidden */
export function objectToName(target: any): string {
    if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
        throw new Error(' Cannot convert. Uknown object');
    }

    return isType(target) ? target.prototype.constructor.name : target.constructor.name;
}
