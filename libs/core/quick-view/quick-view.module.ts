import { NgModule } from '@angular/core';

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

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
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
