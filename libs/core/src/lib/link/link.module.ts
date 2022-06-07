import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkComponent } from './link.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, PortalModule],
    exports: [LinkComponent]
})
export class LinkModule {}
