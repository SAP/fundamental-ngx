import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { RepeatModule } from '@fundamental-ngx/core/utils';
import { FormGroupComponent } from './form-group.component';

@NgModule({
    imports: [CommonModule, SkeletonModule, RepeatModule, LayoutGridModule],
    exports: [FormGroupComponent],
    declarations: [FormGroupComponent]
})
export class FormGroupModule {}
