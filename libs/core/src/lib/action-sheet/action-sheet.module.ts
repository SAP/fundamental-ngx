import { NgModule } from '@angular/core';

import { ActionSheetComponent } from './action-sheet.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DeprecatedActionSheetCompactDirective } from './deprecated-action-sheet-compact.directive';

@NgModule({
    imports: [
        ContentDensityModule,
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetBodyComponent,
        DeprecatedActionSheetCompactDirective
    ],
    exports: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetBodyComponent,
        ContentDensityModule,
        DeprecatedActionSheetCompactDirective
    ]
})
export class ActionSheetModule {}
