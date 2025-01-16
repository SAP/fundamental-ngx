import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndItemDirective } from './dnd-item/dnd-item.directive';
import { DndKeyboardGroupDirective } from './dnd-keyboard-group/dnd-keyboard-group.directive';
import { DndKeyboardItemDirective } from './dnd-keyboard-item/dnd-keyboard-item.directive';
import { DndListDirective } from './dnd-list/dnd-list.directive';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        DndItemDirective,
        DndListDirective,
        DndKeyboardGroupDirective,
        DndKeyboardItemDirective
    ],
    exports: [DndItemDirective, DndListDirective, DndKeyboardGroupDirective, DndKeyboardItemDirective]
})
export class DragAndDropModule {}
