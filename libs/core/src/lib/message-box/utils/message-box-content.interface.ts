import { DialogBaseContent } from '../../dialog/base/dialog-base-content.class';
import { TemplateRef } from '@angular/core';

export interface MessageBoxContent extends DialogBaseContent {
    content?: TemplateRef<any> | string;
}
