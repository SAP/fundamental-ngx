import { DialogContentBase } from '../../dialog/base/dialog-content-base.class';
import { TemplateRef } from '@angular/core';

export interface MessageBoxContent extends DialogContentBase {
    content?: TemplateRef<any> | string;
}
