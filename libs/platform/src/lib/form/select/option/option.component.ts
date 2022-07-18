import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

/**
 * Used to represent an option of the select component.
 */
@Component({
    selector: 'fdp-option',
    template: `<li fd-option [id]="id" [value]="value" [disabled]="disabled"><ng-content></ng-content></li>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent {
    /** Option id attribute */
    @Input()
    id = `fdp-option-${nextUniqueId++}`;

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled = false;
}
