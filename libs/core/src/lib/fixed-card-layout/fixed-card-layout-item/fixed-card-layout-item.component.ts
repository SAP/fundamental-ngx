import { Component, Input, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
    selector: 'fd-fixed-card-layout-item',
    styleUrls: ['../fixed-card-layout.component.scss'],
    templateUrl: 'fixed-card-layout-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: block;'
    }
})
export class FixedCardLayoutItemComponent implements FocusableOption {
    @Input()
    item: any;

    constructor(private _elementRef: ElementRef) {}

    focus(): void {
        this._elementRef.nativeElement.focus();
    }
}
