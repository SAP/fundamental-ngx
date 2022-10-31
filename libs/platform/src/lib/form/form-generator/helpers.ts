import { HintOptions } from '@fundamental-ngx/platform/shared';

/** @hidden */
export function isHintOptions(opts: string | HintOptions): opts is HintOptions {
    return !!opts && typeof opts !== 'string';
}
