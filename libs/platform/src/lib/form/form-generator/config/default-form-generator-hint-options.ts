import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const defaultFormGeneratorHintOptions: Omit<FieldHintOptions, 'text'> = {
    placement: 'right',
    position: 'after',
    trigger: ['click', 'focusout'],
    glyph: 'hint',
    target: 'auto'
};
