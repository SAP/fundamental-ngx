import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';

@NgModule({
    imports: [CommonModule],
    exports: [ListComponent],
    declarations: [ListComponent]
})
export class ListModule {}
