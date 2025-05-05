import { Nullable } from '@fundamental-ngx/cdk/utils';

export class DialogContentBase<ContentType = unknown> {
    /** Dialog Title id */
    titleId?: string;

    /** Dialog Title */
    title?: string;

    /** Dialog Title Heading Level. Default is 1 */
    titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6 = 1;

    /** Dialog Body */
    content?: ContentType;

    /** Dialog Body Id */
    contentId?: string;

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

    /** Full screen Button Click callback */
    fullScreenButtonCallback?: () => void;

    /** close button title */
    closeButtonTitle?: string;

    /** Aria labelby for the dialog close button element. */
    closeButtonAriaLabel?: string;
}
