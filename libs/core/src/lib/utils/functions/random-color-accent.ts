import { ColorAccent } from '../datatypes';

/** Get random number from 1 to 10. */
export function getRandomColorAccent(): ColorAccent {
    return Math.floor(Math.random() * 10) + 1 as ColorAccent;
}
