import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { DynamicComponentService } from '../utils/dynamic-component';
import { MessageBoxService } from './services/message-box.service';
import { MessageBoxBodyComponent } from './message-box-body/message-box-body.component';
import { MessageBoxFooterComponent } from './message-box-footer/message-box-footer.component';
import { MessageBoxHeaderComponent } from './message-box-header/message-box-header.component';
import { BarModule } from '../bar/bar.module';

export const components = [
    MessageBoxContainerComponent,
    MessageBoxFooterComponent,
    MessageBoxHeaderComponent,
    MessageBoxBodyComponent,
    MessageBoxComponent
];

@NgModule({
    declarations: [components],
    imports: [CommonModule, BarModule],
    exports: [components, BarModule],
    providers: [MessageBoxService, DynamicComponentService],
    entryComponents: [MessageBoxComponent, MessageBoxContainerComponent],
})
export class MessageBoxModule {
}
