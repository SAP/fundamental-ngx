import { TemplateRef } from '@angular/core';
import { DialogContentBase } from '../base/dialog-content-base.class';

export class DialogDefaultContent extends DialogContentBase {
    /** Dialog Body */
    content?: TemplateRef<any>;

    /** Subheader Body */
    subHeader?: TemplateRef<any>;

    /** Whether to allow dialog to be opened in full screen mode. */
    allowFullScreen?: boolean;

    /** Full screen button text when dialog is not in full-screen mode. */
    fullScreenExpandButtonText?: string;

    /** Full screen button text when dialog is in full-screen mode. */
    fullScreenMinifyButtonText?: string;
}
