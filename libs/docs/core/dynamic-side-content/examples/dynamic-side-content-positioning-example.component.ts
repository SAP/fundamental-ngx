import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicSideContentModule } from '@fundamental-ngx/core/dynamic-side-content';

@Component({
    selector: 'fd-dynamic-side-content-positioning-example',
    templateUrl: './dynamic-side-content-positioning-example.component.html',
    styleUrls: ['./dynamic-side-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DynamicSideContentModule]
})
export class DynamicSideContentPositioningExampleComponent {}
