import { InjectionToken } from '@angular/core';

export const CSS_CLASS_NAME = {
    host: 'fdp-input-group',
    input: 'fd-input-group__input',
    addon: 'fd-input-group__addon',
    addonButton: 'fd-input-group__addon--button',
    button: 'fd-input-group__button'
} as const;

export const INPUT_GROUP_CHILD_TOKEN = new InjectionToken<string>('INPUT_GROUP_CHILD_TOKEN');
