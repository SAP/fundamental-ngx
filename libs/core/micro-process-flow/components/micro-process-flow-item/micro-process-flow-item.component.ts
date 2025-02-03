import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { MicroProcessFlowFocusableItemDirective } from '../../micro-process-flow-focusable-item.directive';
import { MicroProcessFlowItemType } from '../../types';

@Component({
    selector: 'fd-micro-process-flow-item',
    templateUrl: './micro-process-flow-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-micro-process-flow__item',
        '[class.fd-micro-process-flow__item--positive]': 'state === "positive"',
        '[class.fd-micro-process-flow__item--critical]': 'state === "critical"',
        '[class.fd-micro-process-flow__item--negative]': 'state === "negative"',
        '[class.fd-micro-process-flow__item--information]': 'state === "information"'
    },
    styles: [
        `
            fd-micro-process-flow-item .fd-info-label__text {
                white-space: nowrap;
            }
        `
    ],
    imports: []
})
export class MicroProcessFlowItemComponent {
    /** Item state */
    @Input()
    state: MicroProcessFlowItemType = 'none';

    /** Whether or not display connector line */
    @Input()
    intermediate = false;

    /** Element that can receive focus. */
    @ContentChild(MicroProcessFlowFocusableItemDirective)
    focusableElement: MicroProcessFlowFocusableItemDirective;

    /** @hidden */
    _lastItem = false;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        public elRef: ElementRef
    ) {}

    /**
     * @param value Is current item the last one
     */
    setLastItem(value: boolean): void {
        if (value !== this._lastItem) {
            this._lastItem = value;
            this._cd.detectChanges();
        }
    }
}
