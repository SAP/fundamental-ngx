import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndListDirective } from './dnd-list/dnd-list.directive';
import { DndItemDirective } from './dnd-item/dnd-item.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [CommonModule, DragDropModule],
    exports: [DndItemDirective, DndListDirective],
    declarations: [DndListDirective, DndItemDirective]
})
export class DragAndDropModule {}
