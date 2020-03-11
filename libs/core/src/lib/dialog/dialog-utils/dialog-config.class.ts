/**
 * Configuration for opening a dialog with the DialogService.
 */
import { DialogPosition } from './dialog-position.class';
import { DynamicComponentConfig } from '../../utils/dynamic-component/dynamic-component-config';
import { InjectionToken } from '@angular/core';

export const DIALOG_DEFAULT_CONFIG = new InjectionToken<string[]>('DialogConfig');

export class DialogConfig implements DynamicComponentConfig {

    /** Id for the dialog component. If omitted, a unique one is generated. */
    id?: string;

    /** Width of the dialog. */
    width?: string;

    /** Height of the dialog. */
    height?: string;

    /** Minimum width of the dialog. */
    minWidth?: string;

    /** Minimum height of the dialog. */
    minHeight?: string;

    /** Maximum width of the dialog. */
    maxWidth?: string;

    /** Maximum height of the dialog. */
    maxHeight?: string;

    /** Position of the dialog. */
    position?: DialogPosition;

    /** Aria label for the dialog component element. */
    ariaLabel?: string = null;

    /** Id of the element that labels the dialog. */
    ariaLabelledBy?: string = null;

    /** Id of the element that describes the dialog. */
    ariaDescribedBy?: string = null;

    /** Whether the dialog should have a backdrop. */
    hasBackdrop?: boolean = true;

    /** Global classes to apply to the backdrop. */
    backdropClass?: string = '';

    /** Whether clicking on the backdrop should close the dialog. Only works if hasBackdrop is true. */
    backdropClickCloseable?: boolean = true;

    /** Classes to apply to the `fd-modal-container`  */
    containerClass?: string = '';

    /** Global classes to apply to the dialog panel. */
    modalPanelClass?: string = '';

    /** Whether the escape key should close the dialog. */
    escKeyCloseable?: boolean = true;

    /** Whether the dialog should be focus trapped. */
    focusTrapped?: boolean = true;

    /** The container that the dialog is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the DialogRef. */
    data?: any;
}
