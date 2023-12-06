import { TemplateRef } from '@angular/core';
import { DialogContentBase } from '@fundamental-ngx/core/dialog';

export class MessageBoxContent extends DialogContentBase {
    /** @hidden */
    content?: TemplateRef<any> | string;
}
