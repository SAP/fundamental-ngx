import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

/**
 * The Select component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the select.
 */
@Component({
    selector: 'fn-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalSelectComponent {}
