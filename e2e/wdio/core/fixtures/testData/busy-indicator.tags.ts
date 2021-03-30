import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'busy-indicator-core-';
export const disableButtonExample = prefix + 'disable-button-example-';
export const saveButtonExample = prefix + 'save-button-example-';
export const enableLoadingButtonExample = prefix + 'enable-loading-button-example-';
export const indicatorBlockExample = prefix + 'indicator-block-example';
export const indicatorBlockFocus = 'indicator-block-focus-state-' + getImageTagBrowserPlatform();
export const disableButtonHover = 'disable-button-hover-state-' + getImageTagBrowserPlatform();
export const saveButtonHover = 'save-button-hover-state-' + getImageTagBrowserPlatform();
export const enableLoadingButtonHover = 'enable-loading-button-hover-state-' + getImageTagBrowserPlatform();
export const disableButtonActive = 'disable-button-active-state-' + getImageTagBrowserPlatform();
export const saveButtonActive = 'save-button-active-state-' + getImageTagBrowserPlatform();
export const enableLoadingButtonActive = 'enable-loading-button-active-state-' + getImageTagBrowserPlatform();
export const disableButtonFocus = 'disable-button-focus-state-' + getImageTagBrowserPlatform();
export const saveButtonFocus = 'save-cancel-button-focus-state-' + getImageTagBrowserPlatform();
export const enableLoadingButtonFocus = 'save-cancel-button-focus-state-' + getImageTagBrowserPlatform();
