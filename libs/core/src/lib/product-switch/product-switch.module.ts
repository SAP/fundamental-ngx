import { NgModule } from '@angular/core';
import { ProductSwitchBodyComponent } from './product-switch-body/product-switch-body.component';
import { ProductSwitchComponent } from './product-switch/product-switch.component';

/**
 * @deprecated
 * Use direct imports of `ProductSwitchComponent`, `ProductSwitchBodyComponent`
 */
@NgModule({
    imports: [ProductSwitchComponent, ProductSwitchBodyComponent],
    exports: [ProductSwitchComponent, ProductSwitchBodyComponent]
})
export class ProductSwitchModule {}
