import { NgModule } from '@angular/core';

import { MessagePageActionsComponent } from './message-page-actions/message-page-actions.component';
import { MessagePageMoreComponent } from './message-page-more/message-page-more.component';
import { MessagePageSubtitleComponent } from './message-page-subtitle/message-page-subtitle.component';
import { MessagePageTitleComponent } from './message-page-title/message-page-title.component';
import { MessagePageComponent } from './message-page.component';

const components = [
    MessagePageComponent,
    MessagePageActionsComponent,
    MessagePageMoreComponent,
    MessagePageTitleComponent,
    MessagePageSubtitleComponent
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class MessagePageModule {}
