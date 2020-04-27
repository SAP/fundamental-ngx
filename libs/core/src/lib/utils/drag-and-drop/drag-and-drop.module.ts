import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndListDirective } from './dnd-list/dnd-list.directive';
import { DndContainerDirective } from './dnd-container/dnd-container.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [CommonModule, DragDropModule],
    exports: [DndContainerDirective, DndListDirective],
    declarations: [DndListDirective, DndContainerDirective]
})
export class DragAndDropModule {}
