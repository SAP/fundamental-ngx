import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FixedCardLayoutItemComponent } from './fixed-card-layout-item/fixed-card-layout-item.component';
import { CardDefinitionDirective, FixedCardLayoutComponent } from './fixed-card-layout.component';

@NgModule({
    declarations: [FixedCardLayoutComponent, CardDefinitionDirective, FixedCardLayoutItemComponent],
    imports: [CommonModule, DragDropModule],
    exports: [FixedCardLayoutComponent, CardDefinitionDirective, FixedCardLayoutItemComponent]
})
export class FixedCardLayoutModule {}
