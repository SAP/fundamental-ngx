import { DialogContentBase } from '@fundamental-ngx/core/dialog';
import { TemplateRef } from '@angular/core';

export class MessageBoxContent extends DialogContentBase {
    /** @hidden */
    declare content?: TemplateRef<any> | string;
}
