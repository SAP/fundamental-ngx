import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverflowItemsDirective } from './overflow-items.directive';



@NgModule({
    declarations: [
        OverflowItemsDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OverflowItemsDirective
    ]
})
export class OverflowItemsModule {
}
