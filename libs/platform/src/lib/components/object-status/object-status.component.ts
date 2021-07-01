import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    HostListener
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { KeyUtil, ObjectStatus } from '@fundamental-ngx/core';

export type IndicationColorType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

@Component({
    selector: 'fdp-object-status',
    templateUrl: './object-status.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectStatusComponent {
    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    status: ObjectStatus;

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: string;

    /**
     * A number representing the indication color.
     * Option includes numbers from 1 to 8
     */
    @Input()
    indicationColor: IndicationColorType;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable: boolean;

    /** Whether the Object Status is inverted. */
    @Input()
    inverted: boolean;

    /** Whether the Object Status is in Large Design. */
    @Input()
    large: boolean;

    /** Sets control label attribute value */
    @Input()
    label: string = null;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;

    /** Sets control aria-title to a string attribute value */
    @Input()
    title: string;

    /** Event sent when button is clicked */
    @Output()
    objectStatusClick: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeydown($event: KeyboardEvent): void {
        if (this.clickable && KeyUtil.isKeyCode($event, [ENTER, SPACE])) {
            $event.preventDefault();
            this.objectStatusClick.emit($event);
        }
    }

    /**
     *  Handles button click
     */
    public onObjectStatusClick($event: any): void {
        if (this.clickable) {
            this.objectStatusClick.emit($event);
        }
    }
}
