import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { DndItemDirective } from './dnd-item/dnd-item.directive';
import { DndKeyboardGroupDirective } from './dnd-keyboard-group/dnd-keyboard-group.directive';
import { DndKeyboardItemDirective } from './dnd-keyboard-item/dnd-keyboard-item.directive';
import { DndListDirective } from './dnd-list/dnd-list.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [DragDropModule, DndItemDirective, DndListDirective, DndKeyboardGroupDirective, DndKeyboardItemDirective],
    exports: [DndItemDirective, DndListDirective, DndKeyboardGroupDirective, DndKeyboardItemDirective]
})
export class DragAndDropModule {}
