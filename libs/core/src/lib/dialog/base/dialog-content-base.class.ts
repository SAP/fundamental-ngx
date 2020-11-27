export class DialogContentBase {

    /** Dialog Title */
    title?: string;

    /** Dialog Body */
    content?: unknown;

    /** Approve Button Label */
    approveButton?: string;

    /** Approve Button Click Callback */
    approveButtonCallback?: Function;

    /** Cancel Button Label */
    cancelButton?: string;

    /** Cancel Button Click Callback */
    cancelButtonCallback?: Function;

    /** Close Button Callback */
    closeButtonCallback?: Function;
}
