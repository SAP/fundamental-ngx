import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardDefinitionDirective, FixedCardLayoutComponent } from './fixed-card-layout.component';

@NgModule({
    declarations: [FixedCardLayoutComponent, CardDefinitionDirective],
    imports: [CommonModule, DragDropModule],
    exports: [FixedCardLayoutComponent, CardDefinitionDirective]
})
export class FixedCardLayoutModule {}
