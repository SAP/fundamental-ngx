import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox/checkbox.component';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [
        CommonModule
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {
}
