import { TemplateRef } from '@angular/core';
import { DialogContentBase } from '@fundamental-ngx/core/dialog';

export class MessageBoxContent extends DialogContentBase<TemplateRef<any> | string> {
    /** Heading level for the Message Box title (e.g. h1, h2, etc.) */
    titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6 = 2;

    /** ID for the Message Box content element */
    contentId?: string;
}
