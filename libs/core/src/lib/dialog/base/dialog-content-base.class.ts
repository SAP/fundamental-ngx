import { Nullable } from '@fundamental-ngx/cdk/utils';

export class DialogContentBase {
    /** Dialog Title id */
    titleId?: string;

    /** Dialog Title */
    title?: string;

    /** Dialog Body */
    content?: unknown;

    /** Aria Modal for the dialog component element */
    ariaModal?: boolean;

    /** Aria label for the dialog component element. */
    ariaLabel?: Nullable<string>;

    /** Aria labelby for the dialog component element. */
    ariaLabelledBy?: Nullable<string>;

    /** Aria DescribedBy for the dialog component element.. */
    ariaDescribedBy?: Nullable<string>;

    /** Approve Button Label */
    approveButton?: string;

    /** Approve Button Id */
    approveButtonId?: string;

    /** Approve Button Click Callback */
    approveButtonCallback?: () => void;

    /** Aria label for the dialog approve button element. */
    approveButtonAriaLabel?: string;

    /** Cancel Button Label */
    cancelButton?: string;

    /** Cancel Button Id */
    cancelButtonId?: string;

    /** Cancel Button Click Callback */
    cancelButtonCallback?: () => void;

    /** Close Button Callback */
    closeButtonCallback?: () => void;

    /** close button title */
    closeButtonTitle?: string;

    /** Aria labelby for the dialog close button element. */
    closeButtonAriaLabel?: string;
}
