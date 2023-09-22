import { NgModule } from '@angular/core';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';
import { CardDefinitionDirective, FixedCardLayoutComponent } from './fixed-card-layout.component';

const components = [FixedCardLayoutComponent, CardDefinitionDirective, FixedCardLayoutItemComponent];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FixedCardLayoutModule {}
