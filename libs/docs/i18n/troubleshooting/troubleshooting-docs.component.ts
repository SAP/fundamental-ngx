import { Component } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { DescriptionComponent, DocsSectionTitleComponent, SeparatorComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-troubleshooting-docs',
    templateUrl: './troubleshooting-docs.component.html',
    imports: [DescriptionComponent, DocsSectionTitleComponent, MessageStripComponent, SeparatorComponent]
})
export class TroubleshootingDocsComponent {}
