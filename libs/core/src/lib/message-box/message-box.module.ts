import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';

export const components = [
    MessageBoxComponent
];

@NgModule({
    declarations: [components],
    imports: [CommonModule],
    exports: [components]
})
export class MessageBoxModule {
}
