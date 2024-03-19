import { TemplateRef } from '@angular/core';
import { DialogContentBase } from '@fundamental-ngx/core/dialog';

export class MessageBoxContent extends DialogContentBase<TemplateRef<any> | string> {}
