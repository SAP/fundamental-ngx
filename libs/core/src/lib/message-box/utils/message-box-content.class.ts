import { DialogContentBase } from '@fundamental-ngx/core/dialog';
import { TemplateRef } from '@angular/core';

export class MessageBoxContent extends DialogContentBase {
    content?: TemplateRef<any> | string;
}
