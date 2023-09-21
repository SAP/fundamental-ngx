import { NgModule } from '@angular/core';

import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';
import { DynamicSideContentSideComponent } from './dynamic-side-content-side.component';
import { DynamicSideContentComponent } from './dynamic-side-content.component';

const components = [DynamicSideContentComponent, DynamicSideContentSideComponent, DynamicSideContentMainComponent];

/**
 * @deprecated
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class DynamicSideContentModule {}
