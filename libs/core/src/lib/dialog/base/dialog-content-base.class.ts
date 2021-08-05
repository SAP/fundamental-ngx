export class DialogContentBase {
    /** Dialog Title id */
    titleId?: string;

    /** Dialog Title */
    title?: string;

    /** Dialog Body */
    content?: unknown;

    /** Approve Button Label */
    approveButton?: string;

    /** Aria Modal for the dialog component element */
    ariaModal?: boolean;

    /** Aria label for the dialog component element. */
    ariaLabel?: string = null;

    /** Aria labelby for the dialog component element. */
    ariaLabelledBy?: string = null;

    /** Aria DescribedBy for the dialog component element.. */
    ariaDescribedBy?: string = null;

    /** Approve Button Click Callback */
    approveButtonCallback?: Function;

    /** Cancel Button Label */
    cancelButton?: string;

    /** Cancel Button Click Callback */
    cancelButtonCallback?: Function;

    /** Close Button Callback */
    closeButtonCallback?: Function;

    /** close button title */
    closeButtonTitle?: string;

    /** Aria label for the dialog approve button element. */
    approveButtonAriaLabel?: string;

    /** Aria labelby for the dialog close button element. */
    closeButtonAriaLabel?: string;
}
