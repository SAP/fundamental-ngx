import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndListDirective } from './dnd-list/dnd-list.directive';
import { DndItemDirective } from './dnd-item/dnd-item.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DndKeyboardItemDirective } from './dnd-keyboard-item/dnd-keyboard-item.directive';
import { DndKeyboardGroupDirective } from './dnd-keyboard-group/dnd-keyboard-group.directive';

@NgModule({
    imports: [CommonModule, DragDropModule],
    exports: [DndItemDirective, DndListDirective, DndKeyboardGroupDirective, DndKeyboardItemDirective],
    declarations: [DndItemDirective, DndListDirective, DndKeyboardGroupDirective, DndKeyboardItemDirective]
})
export class DragAndDropModule {}
