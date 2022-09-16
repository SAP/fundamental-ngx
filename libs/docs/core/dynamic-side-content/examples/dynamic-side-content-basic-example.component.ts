import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-dynamic-side-content-basic-example',
    templateUrl: './dynamic-side-content-basic-example.component.html',
    styleUrls: ['./dynamic-side-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSideContentBasicExampleComponent {}
