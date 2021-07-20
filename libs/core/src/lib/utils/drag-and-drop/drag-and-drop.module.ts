import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndListDirective } from './dnd-list/dnd-list.directive';
import { DndItemDirective } from './dnd-item/dnd-item.directive';
import { DndContainerDirective } from './dnd-container/dnd-container.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [CommonModule, DragDropModule],
    exports: [DndItemDirective, DndListDirective, DndContainerDirective],
    declarations: [DndListDirective, DndItemDirective, DndContainerDirective]
})
export class DragAndDropModule {}
