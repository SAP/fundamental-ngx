import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicSideContentComponent } from './dynamic-side-content.component';
import { DynamicSideContentSideComponent } from './dynamic-side-content-side.component';
import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';

const components = [DynamicSideContentComponent, DynamicSideContentSideComponent, DynamicSideContentMainComponent];

@NgModule({
    declarations: [...components],
    imports: [CommonModule],
    exports: [...components]
})
export class DynamicSideContentModule {}
