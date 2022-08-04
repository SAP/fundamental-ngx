import { NgModule } from '@angular/core';
import { ProductSwitchComponent } from './product-switch/product-switch.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from '@fundamental-ngx/core/utils';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ProductSwitchBodyComponent } from './product-switch-body/product-switch-body.component';

@NgModule({
    imports: [PopoverModule, CommonModule, ButtonModule, DragAndDropModule, DragDropModule, I18nModule],
    declarations: [ProductSwitchComponent, ProductSwitchBodyComponent],
    exports: [ProductSwitchComponent, ProductSwitchBodyComponent]
})
export class ProductSwitchModule {}
