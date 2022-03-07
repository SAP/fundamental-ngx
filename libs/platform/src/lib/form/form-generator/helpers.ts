import { HintOptions } from './interfaces/hint-options';

export function isHintOptions(opts: string | HintOptions): opts is HintOptions {
    return opts && typeof opts !== 'string';
}
