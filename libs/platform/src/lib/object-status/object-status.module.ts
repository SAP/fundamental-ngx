import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectStatusComponent } from './object-status.component';

@NgModule({
    declarations: [ObjectStatusComponent],
    imports: [CommonModule, ObjectStatusModule],
    exports: [ObjectStatusComponent]
})
export class PlatformObjectStatusModule {}
