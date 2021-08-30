import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
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
export class MicroProcessFlowItemComponent implements OnInit {

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

    ngOnInit(): void {
    }

    setFinalStep(value: boolean): void {
        this._finalStep = value;
        this._cd.detectChanges();
    }

}
