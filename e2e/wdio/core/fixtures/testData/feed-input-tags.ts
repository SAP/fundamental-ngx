import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'feed-input-core-';

export const activeInputTextAreasExample = prefix + 'active-input-text-areas-example-';
export const activeInputButtonsExample = prefix + 'active-input-buttons-example-';
export const disableInputTextAreasExample = prefix + 'disable-input-text-areas-example-';
export const disableInputButtonsExample = prefix + 'disable-input-buttons-example-';

export const disableInputTextAreasHoverState = 'disable-input-text-areas-hover-state-' + getImageTagBrowserPlatform();
export const disableInputButtonsHoverState = 'disable-input-button-hover-state-' + getImageTagBrowserPlatform();

export const activeInputTextAreasHoverState = 'active-input-text-areas-hover-state-' + getImageTagBrowserPlatform();
export const activeInputButtonsHoverState = 'disable-input-button-hover-state-' + getImageTagBrowserPlatform();

export const activeInputTextAreasFocusState = 'active-input-text-areas-focus-state-' + getImageTagBrowserPlatform();
export const activeInputButtonsFocusState = 'disable-input-button-focus-state-' + getImageTagBrowserPlatform();

export const activeInputButtonsActiveState = 'disable-input-button-active-state-' + getImageTagBrowserPlatform();








