import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const defaultFormGeneratorHintOptions: Omit<FieldHintOptions, 'text'> = {
    placement: 'left',
    position: 'after',
    trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
    glyph: 'message-information',
    target: 'auto'
};
