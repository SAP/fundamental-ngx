import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type TagColorType = 'grey' | 'blue' | 'teal' | 'green' | 'mango' | 'red' | 'pink' | 'indigo';

@Component({
    selector: 'fn-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ExperimentalTagComponent {
    /**
     * The color of the tag.
     * Options include grey, blue, teal, green, mango, red, pink, indigo
     */
    @Input()
    color: TagColorType = 'grey';

    /** Whether the Tag is disabled. */
    @Input()
    disabled: boolean;
}
