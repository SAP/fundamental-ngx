import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-doc-page',
    templateUrl: './doc-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocPageComponent {
    constructor() {}
}
