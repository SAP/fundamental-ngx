import { Hash } from '../public_api';

export function getStringFromHashMap<T>(hashMap: Hash<T>): string {
    return Object.keys(hashMap)
        .map((key) => hashMap[key])
        .reduce((acc, value) => (acc += value), '');
}
