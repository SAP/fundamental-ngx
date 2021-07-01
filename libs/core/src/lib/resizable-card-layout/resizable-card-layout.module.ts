import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CardModule } from '@fundamental-ngx/core/card';

import { ResizableCardLayoutComponent } from './resizable-card-layout/resizable-card-layout.component';
import { ResizableCardItemComponent } from './resizable-card-layout/resizable-card-item/resizable-card-item.component';

@NgModule({
    imports: [CommonModule, CardModule, DragDropModule],
    declarations: [ResizableCardLayoutComponent, ResizableCardItemComponent],
    exports: [ResizableCardLayoutComponent, ResizableCardItemComponent]
})
export class ResizableCardLayoutModule {}
