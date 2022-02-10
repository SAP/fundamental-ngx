import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ObjectStatusComponent } from './object-status.component';

@NgModule({
    declarations: [ObjectStatusComponent],
    imports: [CommonModule, IconModule],
    exports: [ObjectStatusComponent]
})
export class ObjectStatusModule {}
