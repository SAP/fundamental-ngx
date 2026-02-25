import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ToolbarFormLabelDirective } from './toolbar-form-label.directive';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarLabelDirective } from './toolbar-label.directive';
import { ToolbarOverflowButtonMenuDirective } from './toolbar-overflow-button-menu.directive';
import { ToolbarOverflowButtonDirective } from './toolbar-overflow-button.directive';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarSpacerDirective } from './toolbar-spacer.directive';
import { ToolbarComponent } from './toolbar.component';

const components = [
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSpacerDirective,
    ToolbarSeparatorComponent,
    ToolbarFormLabelDirective,
    ToolbarLabelDirective,
    ToolbarOverflowButtonDirective,
    ToolbarOverflowButtonMenuDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ContentDensityModule, ...components],
    exports: [...components, ContentDensityModule]
})
export class ToolbarModule {}
