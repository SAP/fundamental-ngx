import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarSpacerComponent } from './toolbar-spacer.component';
import { ToolbarLabelDirective } from './toolbar-label.directive';
import { ToolbarOverflowButtonDirective } from './toolbar-overflow-button.directive';
import { ToolbarOverflowButtonMenuDirective } from './toolbar-overflow-button-menu.directive';
import { ToolbarFormLabelDirective } from './toolbar-form-label.directive';
import { ToolbarOverflowPriorityDirective } from './toolbar-overflow-priority.directive';
import { ToolbarOverflowGroupDirective } from './toolbar-overflow-group.directive';

const components = [
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSpacerComponent,
    ToolbarSeparatorComponent,
    ToolbarFormLabelDirective,
    ToolbarLabelDirective,
    ToolbarOverflowButtonDirective,
    ToolbarOverflowButtonMenuDirective,
    ToolbarOverflowPriorityDirective,
    ToolbarOverflowGroupDirective
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, ButtonModule, PopoverModule],
    exports: [...components]
})
export class ToolbarModule {}
