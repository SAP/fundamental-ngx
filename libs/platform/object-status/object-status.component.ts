import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Directive,
    EventEmitter,
    HostListener,
    Input,
    Output,
    TemplateRef,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { ColorAccent, KeyUtil, Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { ObjectStatusComponent as CoreObjectStatusComponent, ObjectStatus } from '@fundamental-ngx/core/object-status';

@Directive({
    selector: '[fdpObjectStatusText]',
    standalone: true
})
export class PlatformObjectStatusTextDirective {
    /**
     * Template reference.
     */
    templateRef = inject(TemplateRef);
}

/**
 * @deprecated
 * Use `ColorAccent` from `@fundamental-ngx/cdk/utils` instead.
 */
export type IndicationColorType = ColorAccent;

/**
 * @deprecated
 * Use `ObjectStatus` from `@fundamental-ngx/core/object-status` instead.
 */
@Component({
    selector: 'fdp-object-status',
    templateUrl: './object-status.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CoreObjectStatusComponent]
})
export class ObjectStatusComponent {
    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    status: Nullable<ObjectStatus>;

    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /**
     * A number representing the indication color.
     * For non-inverted state available numbers are from 1 to 8.
     * For inverted state available numbers are from 1 to 10.
     */
    @Input()
    indicationColor: ColorAccent;

    /** Whether to use secondary set of indication colors. */
    @Input()
    secondaryIndication = false;

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
    label: Nullable<string>;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets control aria-title to a string attribute value */
    @Input()
    title: string;

    /** Event sent when button is clicked */
    @Output()
    objectStatusClick: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** @hidden */
    @ContentChild(PlatformObjectStatusTextDirective)
    _textDirective: Nullable<PlatformObjectStatusTextDirective>;

    /** @hidden */
    constructor() {
        warnOnce('ObjectStatusComponent is deprecated. Use ObjectStatusComponent from @fundamental-ngx/core instead.');
    }

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
