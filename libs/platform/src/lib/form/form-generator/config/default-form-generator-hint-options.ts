import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const defaultFormGeneratorHintOptions: Omit<FieldHintOptions, 'text'> = {
    placement: 'right',
    position: 'after',
    trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
    glyph: 'hint',
    target: 'auto'
};
