import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
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
      '[class.fd-micro-process-flow__item--information]': 'state === "information"',
      '[class.fd-micro-process-flow__item--last]': '_finalStep === true'
  }
})
export class MicroProcessFlowItemComponent {

    @Input()
    state: MicroProcessFlowItemType = 'none';

    @Input()
    intermediate = false;

    _finalStep = false;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        public elRef: ElementRef<HTMLElement>
    ) { }

    setFinalStep(value: boolean): void {
        if (value !== this._finalStep) {
            this._finalStep = value;
            this._cd.detectChanges();
        }
    }

}
