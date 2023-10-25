import { NgModule } from '@angular/core';

import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { ActionSheetComponent } from './action-sheet.component';

const components = [
    ActionSheetComponent,
    ActionSheetControlComponent,
    ActionSheetItemComponent,
    ActionSheetBodyComponent
];

/**
 * @deprecated
 * Use direct imports of components.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class ActionSheetModule {}
