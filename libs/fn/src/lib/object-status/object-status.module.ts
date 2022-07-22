import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ObjectStatusComponent } from './object-status.component';

@NgModule({
    imports: [CommonModule, IconModule],
    exports: [ObjectStatusComponent],
    declarations: [ObjectStatusComponent]
})
export class ObjectStatusModule {}
