import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkComponent } from './link.component';

@NgModule({
    declarations: [
        LinkComponent
    ],
    imports: [CommonModule],
    exports: [
        LinkComponent
    ]
})
export class LinkModule {}
