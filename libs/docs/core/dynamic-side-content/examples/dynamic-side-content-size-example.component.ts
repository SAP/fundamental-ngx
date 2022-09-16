import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-dynamic-side-content-size-example',
    templateUrl: './dynamic-side-content-size-example.component.html',
    styleUrls: ['./dynamic-side-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSideContentSizeExampleComponent {}
