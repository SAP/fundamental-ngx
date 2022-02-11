import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'fundamental-ngx-segmented-button-reactive-form-example',
    templateUrl: './segmented-button-reactive-form-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedButtonReactiveFormExampleComponent {
    segmentControl = new FormControl('value2');
    value$: Observable<string>;

    constructor() {
        this.value$ = this.segmentControl.valueChanges.pipe(startWith(this.segmentControl.value));
    }
}
