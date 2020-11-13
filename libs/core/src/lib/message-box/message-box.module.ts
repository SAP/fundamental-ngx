import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { DynamicComponentService } from '../utils/dynamic-component';
import { MessageBoxService } from './services/message-box.service';

export const components = [
    MessageBoxComponent
];

@NgModule({
    declarations: [components, MessageBoxContainerComponent],
    imports: [CommonModule],
    exports: [components],
    providers: [MessageBoxService, DynamicComponentService]
})
export class MessageBoxModule {
}
