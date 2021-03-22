import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'bar-core-';
export const leftArrowButtonExample = prefix + 'left-arrow-button-example-';
export const saveCancelButtonExample = prefix + 'save-cancel-button-example-';
export const leftArrowButtonHover = 'left-arrow-hover-state-' + getImageTagBrowserPlatform();
export const saveCancelButtonHover = 'save-cancel-button-hover-state-' + getImageTagBrowserPlatform();
export const leftArrowButtonActive = 'left-arrow-active-state-' + getImageTagBrowserPlatform();
export const saveCancelButtonActive = 'save-cancel-button-active-state-' + getImageTagBrowserPlatform();
export const leftArrowButtonFocus = 'left-arrow-focus-state-' + getImageTagBrowserPlatform();
export const saveCancelButtonFocus = 'save-cancel-button-focus-state-' + getImageTagBrowserPlatform();
