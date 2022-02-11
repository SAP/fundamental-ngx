import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-segmented-button-default-example',
    templateUrl: './segmented-button-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedButtonDefaultExampleComponent {
    segmentModel = 'value2';
    disabled = false;
    toggle = false;
}
