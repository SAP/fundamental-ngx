import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';

import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, FormsModule],
    exports: [LinkComponent]
})
export class LinkModule {}
