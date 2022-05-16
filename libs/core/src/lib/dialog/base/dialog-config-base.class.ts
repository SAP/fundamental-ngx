/* eslint-disable @typescript-eslint/no-inferrable-types */

import { DynamicComponentConfig } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

import { DialogPosition } from '../utils/dialog-position.class';

export class DialogConfigBase<T> implements DynamicComponentConfig {
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

    /** Aria Modal for the dialog component element */
    ariaModal?: boolean = false;

    /** Aria label for the dialog component element. */
    ariaLabel?: Nullable<string>;

    /** Id of the element that labels the dialog. */
    ariaLabelledBy?: Nullable<string>;

    /** Id of the element that describes the dialog. */
    ariaDescribedBy?: Nullable<string>;

    /** Whether the dialog should have a backdrop. */
    hasBackdrop?: boolean = true;

    /** Whether clicking on the backdrop should close the dialog. Only works if hasBackdrop is true. */
    backdropClickCloseable?: boolean = false;

    /** Global classes to apply to the backdrop. */
    backdropClass?: string;

    /** Classes to apply to the `fd-dialog-container`  */
    containerClass?: string;

    /** Global classes to apply to the dialog panel. */
    dialogPanelClass?: string;

    /** Whether the escape key should close the dialog. */
    escKeyCloseable?: boolean = true;

    /** Whether the dialog should be focus trapped. */
    focusTrapped?: boolean = true;

    /** The container that the dialog is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the DialogRef. */
    data?: T;

    /** Whether the dialog should be displayed in mobile mode. */
    mobile?: boolean;

    /** Whether the dialog in mobile mode should have outer space. */
    mobileOuterSpacing?: boolean;

    /** Whether the dialog should have vertical padding. */
    verticalPadding?: boolean = true;

    /** Workaround for IE11, as `flex-grow: 1` on dialog body won't work when 'min-height' for dialog set
     * There is another way to get dialog of wanted height by setting `min-height` for dialog body.
     */
    bodyMinHeight?: string;

    /** Whether the dialog should have responsive horizontal padding changing with Dialogs window width.
     * max-width: 599px                         - .fd-dialog__content--s
     * min-width: 600px and max-width: 1023px   - .fd-dialog__content--m
     * min-width: 1024px and max-width: 1439px  - .fd-dialog__content--l
     * min-width: 1440px                        - .fd-dialog__content--xl
     * */
    responsivePadding?: boolean = false;

    /** Whether to close the dialog on router navigation start. */
    closeOnNavigation?: boolean = true;
}
