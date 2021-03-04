import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'action-bar-core-';
export const backButtonExample = prefix + 'back-button-example-';
export const longTitleExample = prefix + 'long-title-example-';
export const noBackButtonExample = prefix + 'no-back-button-example-';
export const contextualMenuExample = prefix + 'contextual-menu-example-';
export const mobileViewExample = prefix + 'mobile-view-example-';

export const backButtonHoverState = 'back-button-hover-state-' + getImageTagBrowserPlatform();
export const backButtonFocusState = 'back-button-focus-state-' + getImageTagBrowserPlatform();

export const cancelButtonHoverState = 'cancel-hover-focus-state-' + getImageTagBrowserPlatform();
export const cancelButtonFocusState = 'cancel-button-focus-state-' + getImageTagBrowserPlatform();

export const saveButtonHoverState = 'save-button-hover-state-' + getImageTagBrowserPlatform();
export const saveButtonFocusState = 'save-button-focus-state-' + getImageTagBrowserPlatform();

export const menuButtonHoverState = 'menu-button-hover-state-' + getImageTagBrowserPlatform();
export const menuButtonFocusState = 'menu-button-focus-state-' + getImageTagBrowserPlatform();

export const menuItemHoverState = 'menu-item-hover-state-' + getImageTagBrowserPlatform();
export const menuItemFocusState = 'menu-item-focus-state-' + getImageTagBrowserPlatform();
export const menuItemActiveState = 'menu-item-active-state-' + getImageTagBrowserPlatform();
