import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectStatusComponent } from './object-status.component';
import { ObjectStatusModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [ObjectStatusComponent],
    imports: [CommonModule, ObjectStatusModule],
    exports: [ObjectStatusComponent]
})
export class PlatformObjectStatusModule {}
