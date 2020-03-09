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

    /** Select type defines the label types */
    @Input()
    labelType: LabelType;

    /** define the icon type */
    @Input()
    glyph: String; 

    /**define the colour of the info label */
    @Input()
    color: String;

    cssname: string = '';

    /** @hidden */
    constructor() {
    }
    ngOnInit() {
    }

    get buildCustomCss(): string {

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
