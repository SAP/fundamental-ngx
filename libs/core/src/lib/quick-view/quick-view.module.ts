import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarModule } from '@fundamental-ngx/core/bar';
import { FormGroupComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TitleModule } from '@fundamental-ngx/core/title';
import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content/quick-view-group-item-content-element.directive';
import { QuickViewGroupItemContentComponent } from './quick-view-group-item-content/quick-view-group-item-content.component';
import { QuickViewGroupItemLabelComponent } from './quick-view-group-item-label/quick-view-group-item-label.component';
import { QuickViewGroupItemComponent } from './quick-view-group-item/quick-view-group-item.component';
import { QuickViewGroupTitleComponent } from './quick-view-group-title/quick-view-group-title.component';
import { QuickViewGroupComponent } from './quick-view-group/quick-view-group.component';
import { QuickViewSubheaderSubtitleComponent } from './quick-view-subheader-subtitle/quick-view-subheader-subtitle.component';
import { QuickViewSubheaderTitleComponent } from './quick-view-subheader-title/quick-view-subheader-title.component';
import { QuickViewSubheaderComponent } from './quick-view-subheader/quick-view-subheader.component';
import { QuickViewTitleComponent } from './quick-view-title/quick-view-title.component';
import { QuickViewComponent } from './quick-view/quick-view.component';

@NgModule({
    imports: [
        CommonModule,
        TitleModule,
        BarModule,
        FormGroupComponent,
        FormItemComponent,
        FormLabelComponent,
        PopoverModule
    ],
    declarations: [
        QuickViewComponent,
        QuickViewTitleComponent,
        QuickViewSubheaderComponent,
        QuickViewSubheaderTitleComponent,
        QuickViewSubheaderSubtitleComponent,
        QuickViewGroupComponent,
        QuickViewGroupTitleComponent,
        QuickViewGroupItemComponent,
        QuickViewGroupItemLabelComponent,
        QuickViewGroupItemContentComponent,
        QuickViewGroupItemContentElementDirective
    ],
    exports: [
        QuickViewComponent,
        QuickViewTitleComponent,
        QuickViewSubheaderComponent,
        QuickViewSubheaderTitleComponent,
        QuickViewSubheaderSubtitleComponent,
        QuickViewGroupComponent,
        QuickViewGroupTitleComponent,
        QuickViewGroupItemComponent,
        QuickViewGroupItemLabelComponent,
        QuickViewGroupItemContentComponent,
        QuickViewGroupItemContentElementDirective
    ]
})
export class QuickViewModule {}
