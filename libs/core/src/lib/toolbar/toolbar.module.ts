import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarSpacerDirective } from './toolbar-spacer.directive';
import { ToolbarLabelDirective } from './toolbar-label.directive';
import { ToolbarOverflowButtonDirective } from './toolbar-overflow-button.directive';
import { ToolbarOverflowButtonMenuDirective } from './toolbar-overflow-button-menu.directive';
import { ToolbarFormLabelDirective } from './toolbar-form-label.directive';
import { DeprecatedToolbarSizeDirective } from './deprecated-toolbar-size.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

const components = [
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSpacerDirective,
    ToolbarSeparatorComponent,
    ToolbarFormLabelDirective,
    ToolbarLabelDirective,
    ToolbarOverflowButtonDirective,
    ToolbarOverflowButtonMenuDirective,
    DeprecatedToolbarSizeDirective
];

@NgModule({
    imports: [ContentDensityModule, ...components],
    exports: [...components, ContentDensityModule]
})
export class ToolbarModule {}
