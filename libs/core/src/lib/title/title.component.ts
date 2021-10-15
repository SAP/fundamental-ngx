import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
    // tslint:disable-next-line
    selector: 'h1[fd-title], h2[fd-title], h3[fd-title], h4[fd-title], h5[fd-title], h6[fd-title]',
    exportAs: 'fd-title',
    template: '<ng-content></ng-content>',
    host: {
        class: 'fd-title',
        '[class.fd-title--wrap]': 'wrap'
    },
    styleUrls: ['./title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TitleComponent implements OnInit {
    /** The size of the header */
    _headerSize: HeaderSizes = null;

    get headerSize(): HeaderSizes {
        return this._headerSize;
    }

    @Input()
    set headerSize(value: HeaderSizes) {
        this._headerSize = value;
        if (this._appliedHeaderSize !== this.headerSize) {
            this._setHeaderSize();
        }
    }

    /** Whether or not the title should wrap (truncates by default) */
    @Input()
    wrap = false;

    /** @hidden */
    private _appliedHeaderSize: number;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._setHeaderSize();
    }

    /** @hidden */
    private _setHeaderSize(): void {
        let headerSize;
        if (this.headerSize) {
            headerSize = this.headerSize;
        } else {
            headerSize = this._elementRef.nativeElement.tagName.charAt(1);
        }

        this._elementRef.nativeElement.classList.remove(`fd-title--h${this._appliedHeaderSize}`);
        this._elementRef.nativeElement.classList.add(`fd-title--h${headerSize}`);
        this._appliedHeaderSize = headerSize;
    }
}
