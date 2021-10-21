import { TemplateRef } from '@angular/core';
import { DialogContentBase } from '../base/dialog-content-base.class';

export class DialogDefaultContent extends DialogContentBase {
    /** Dialog Body */
    content?: TemplateRef<any>;

    /** Subheader Body */
    subHeader?: TemplateRef<any>;
}
