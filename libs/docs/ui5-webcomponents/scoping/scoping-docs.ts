import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DescriptionComponent, DocsSectionTitleComponent, SeparatorComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-scoping-docs',
    templateUrl: './scoping-docs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DocsSectionTitleComponent, DescriptionComponent, SeparatorComponent]
})
export class ScopingDocs {}
