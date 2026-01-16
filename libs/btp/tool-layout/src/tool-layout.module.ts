import { NgModule } from '@angular/core';
import { ToolLayoutContainerDirective } from './directives/tool-layout-container.directive';
import { ToolLayoutContentContainerDirective } from './directives/tool-layout-content-container.directive';
import { ToolLayoutHeaderContainerDirective } from './directives/tool-layout-header-container.directive';
import { ToolLayoutNavigationContainerDirective } from './directives/tool-layout-navigation-container.directive';
import { ToolLayoutComponent } from './tool-layout.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective
    ],
    exports: [
        ToolLayoutComponent,
        ToolLayoutContainerDirective,
        ToolLayoutContentContainerDirective,
        ToolLayoutHeaderContainerDirective,
        ToolLayoutNavigationContainerDirective
    ]
})
export class ToolLayoutModule {}
