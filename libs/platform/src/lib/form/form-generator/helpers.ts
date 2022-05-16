import { HintOptions } from '@fundamental-ngx/platform/shared';

export function isHintOptions(opts: string | HintOptions): opts is HintOptions {
    return !!opts && typeof opts !== 'string';
}
