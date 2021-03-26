import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'date-picker-';
export const activeDivDatePicker = prefix + 'active-input-';
export const activeBtnDatePicker = prefix + 'active-button-';
export const frenchButton = prefix + 'button-french-';
export const germanButton = prefix + 'button-german-';
export const bulgarianButton = prefix + 'button-bulgarian-';

export const activeDivDatePickerHoverState = 'hover-state-' + getImageTagBrowserPlatform();
export const activeButtonDatePickerHoverState = 'hover-state-' + getImageTagBrowserPlatform();
export const buttonFrenchHoverState = 'hover-state-' + getImageTagBrowserPlatform();
export const buttonGermanHoverState = 'hover-state-' + getImageTagBrowserPlatform();
export const buttonBulgarianHoverState = 'hover-state-' + getImageTagBrowserPlatform();

export const activeDivDatePickerActiveState = 'active-state-' + getImageTagBrowserPlatform();
export const activeButtonDatePickerActiveState = 'active-state-' + getImageTagBrowserPlatform();
export const buttonFrenchActiveState = 'active-state-' + getImageTagBrowserPlatform();
export const buttonGermanActiveState = 'active-state-' + getImageTagBrowserPlatform();
export const buttonBulgarianActiveState = 'active-state-' + getImageTagBrowserPlatform();

export const activeDivDatePickerFocusState = 'focus-state-' + getImageTagBrowserPlatform();
export const activeButtonDatePickerFocusState = 'focus-state-' + getImageTagBrowserPlatform();
export const buttonFrenchFocusState = 'focus-state-' + getImageTagBrowserPlatform();
export const buttonGermanFocusState = 'focus-state-' + getImageTagBrowserPlatform();
export const buttonBulgarianFocusState = 'focus-state-' + getImageTagBrowserPlatform();

