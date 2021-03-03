import { getImageTagBrowserPlatform } from '../../../driver/wdio';

const prefix = 'breadcrumb-core-';
export const linksExample = prefix + 'link-example-';
export const linksHoverState = 'link-hover-state-' + getImageTagBrowserPlatform();
export const disabledLinksState = 'disabled-link-hover-state' + getImageTagBrowserPlatform();
export const linksActiveState = 'link-active-state-' + getImageTagBrowserPlatform();
