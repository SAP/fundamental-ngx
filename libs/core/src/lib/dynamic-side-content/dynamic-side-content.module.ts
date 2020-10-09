import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicSideContentComponent } from './dynamic-side-content.component';
import { DynamicSideSideComponent } from './dynamic-side-content-side.component';
import { DynamicSideMainComponent } from './dynamic-side-content-main.component';

const components = [DynamicSideContentComponent, DynamicSideSideComponent, DynamicSideMainComponent];

@NgModule({
    declarations: [...components],
    imports: [CommonModule],
    exports: [...components]
})
export class DynamicSideContentModule {}
