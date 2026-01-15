import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { VhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';
import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';

const components = [PlatformValueHelpDialogComponent, VhdFilterComponent, ContentDensityModule];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformValueHelpDialogModule {}
