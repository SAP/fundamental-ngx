import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { GenericTagComponent } from './generic-tag.component';

@NgModule({
    declarations: [GenericTagComponent],
    imports: [CommonModule, IconModule],
    exports: [GenericTagComponent]
})
export class GenericTagModule {}
