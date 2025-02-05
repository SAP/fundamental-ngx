import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';

export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

export abstract class TitleToken {
    abstract elementRef: ElementRef;
}

@Component({
    // eslint-disable-next-line
    selector: '[fd-title], [fdTitle]',

    exportAs: 'fd-title',
    template: '<ng-content></ng-content>',
    host: {
        class: 'fd-title',
        '[class.fd-title--wrap]': 'wrap'
    },
    styleUrl: './title.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: TitleToken, useExisting: TitleComponent }],
    standalone: true
})
export class TitleComponent extends TitleToken implements OnInit {
    /** Header size of the title. */
    @Input()
    set headerSize(value: Nullable<HeaderSizes>) {
        this._headerSize = value;
        if (this._appliedHeaderSize !== this._headerSize) {
            this._setHeaderSize();
        }
    }

    get headerSize(): Nullable<HeaderSizes> {
        return this._headerSize;
    }
    /** Whether or not the title should wrap (truncates by default) */
    @Input()
    wrap = false;

    /** The size of the header */
    _headerSize: Nullable<HeaderSizes> = null;

    /** @hidden */
    private _appliedHeaderSize: number;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        this._setHeaderSize();
    }

    /** returns the reference to the title element */
    get elementRef(): ElementRef {
        return this._elementRef;
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
