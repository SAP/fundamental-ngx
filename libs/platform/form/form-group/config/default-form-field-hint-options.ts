import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const defaultFormFieldHintOptions: Omit<FieldHintOptions, 'content'> = {
    placement: 'right',
    position: 'after',
    trigger: [
        { trigger: 'mouseenter', openAction: true, closeAction: false },
        { trigger: 'mouseleave', openAction: false, closeAction: true },
        { trigger: 'focusin', openAction: true, closeAction: false },
        { trigger: 'focusout', openAction: false, closeAction: true }
    ],
    glyph: 'hint',
    target: 'auto'
};
