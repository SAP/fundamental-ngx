import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { PopoverModule } from '../popover/public_api';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarSpacerComponent } from './toolbar-spacer.component';
import { ToolbarLabelDirective } from './toolbar-label.directive';
import { ToolbarFormLabelDirective } from './toolbar-form-label.directive';

const components = [
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSpacerComponent,
    ToolbarSeparatorComponent,
    ToolbarFormLabelDirective,
    ToolbarLabelDirective
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, ButtonModule, PopoverModule],
    exports: [...components]
})
export class ToolbarModule {}
