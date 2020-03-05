import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
  selector: 'fd-object-status',
  templateUrl: './object-status.component.html',
  styleUrls: ['./object-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectStatusComponent implements OnInit {

    /** Select type defines the border type of the select button. */
    @Input()
    objectStatus: ObjectStatus;

    @Input()
    glyph: String; 

    @Input()
    message: String;

    @Input()
    color: String;

    @Input()
    inverted: boolean;

    @Input()
    clickable: boolean;

    @Input()
    large: boolean;

    cssname: string = '';

    /** @hidden */
    constructor() {
    }
    ngOnInit() {
    }

    get getCustomCssClass(): string {

        if (this.objectStatus === 'negative') {
            this.cssname = this.cssname + ' fd-object-status--negative';
        }
        if (this.objectStatus === 'critical') {
            this.cssname = this.cssname + ' fd-object-status--critical';
        }
        if (this.objectStatus === 'positive') {
            this.cssname = this.cssname + ' fd-object-status--positive';
        }
        if (this.objectStatus === 'informative') {
            this.cssname = this.cssname + ' fd-object-status--informative';
        }
        if (this.glyph) {
            this.cssname = this.cssname + ' sap-icon--' + this.glyph;
        }
        if (this.color) {
            this.cssname = this.cssname + ' fd-object-status--indication-' + this.color;
        }
        if (this.inverted) {
            this.cssname = this.cssname + ' fd-object-status--inverted';
        }
        if (this.clickable) {
            this.cssname = this.cssname + ' fd-object-status--link';
        }
        if (this.large) {
            this.cssname = this.cssname + ' fd-object-status--large';
        }

        return this.cssname;
    }

}
