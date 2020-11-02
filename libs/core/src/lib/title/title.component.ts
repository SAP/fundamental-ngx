import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
    // tslint:disable-next-line
    selector: 'h1[fd-title], h2[fd-title], h3[fd-title], h4[fd-title], h5[fd-title], h6[fd-title]',
    exportAs: 'fd-title',
    template: `<ng-content></ng-content>`,
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
    @Input()
    headerSize: HeaderSizes = null;

    /** Whether or not the title should wrap (truncates by default) */
    @Input()
    wrap = false;

    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        let headerSize;
        if (this.headerSize) {
            headerSize = this.headerSize;
        } else {
            headerSize = this._elRef.nativeElement.tagName.charAt(1);
        }
        this._elRef.nativeElement.classList.add('fd-title--h' + headerSize);
    }
}
