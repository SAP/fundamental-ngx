import { DialogConfig } from '@fundamental-ngx/core/dialog';

export interface MobileModeConfig {
    /** Dialog Title */
    title?: string;

    /** Short instruction text rendered below the dialog title to guide the user. */
    instruction?: string;

    /** Approve Button Label. If empty, button will not appear */
    approveButtonText?: string;

    /** Cancel Button Label. If empty, button will not appear */
    cancelButtonText?: string;

    /** Defines if the close button should appear */
    hasCloseButton?: boolean;

    /** Passes custom configuration of the Dialog window */
    dialogConfig?: DialogConfig;
}
