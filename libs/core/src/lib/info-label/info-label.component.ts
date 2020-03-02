import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, ElementRef } from '@angular/core';

type LabelType = 'numeric' | 'only-icon' | 'icon';

@Component({
    selector: 'fd-info-label',
    templateUrl: './info-label.component.html',
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelComponent implements OnInit {

    /** Select type defines the border type of the select button. */
    @Input()
    labelType: LabelType;

    @Input()
    glyph: String; 

    @Input()
    message: String;

    @Input()
    color: String;

    cssname: string = '';

    /** @hidden */
    constructor() {
    }
    ngOnInit() {
    }

    get getCustomIconClass(): string {

        if (this.labelType === 'numeric') {
            this.cssname = this.cssname + 'fd-info-label--numeric';
        }
        if (this.labelType === 'icon') {
            this.cssname = this.cssname + 'fd-info-label--icon';
        }
        if (this.labelType === 'only-icon') {
            this.cssname = this.cssname + 'fd-info-label--only-icon';
        }
        if (this.glyph) {
            this.cssname = this.cssname + ' sap-icon--' + this.glyph;
        }
        if (this.color) {
            this.cssname = this.cssname + ' fd-info-label--accent-color-' + this.color;
        }
        return this.cssname;
    }

}
