import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-segmented-button-template-driven-example',
    templateUrl: './segmented-button-template-driven-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedButtonTemplateDrivenExampleComponent {
    segmentModel = 'value2';
}
