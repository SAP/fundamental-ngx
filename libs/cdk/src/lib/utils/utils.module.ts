import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UtilsComponent],
    exports: [UtilsComponent]
})
export class UtilsModule {}
