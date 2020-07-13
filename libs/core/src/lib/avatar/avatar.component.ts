import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type ColorAccent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
let avatarUniqueId: number = 0;

@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: 'fd-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the Avatar. */
    @Input()
    @HostBinding('attr.id')
    id: string = `fd-avatar-${avatarUniqueId++}`;

    /** Aria-label for Avatar. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string = null;

    /** Aria-Labelledby for element describing Avatar. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledby: string = null;

    /** The size of the Avatar. Options include: *xs*, *s*, *m*, *l* and *xl*. */
    @Input() size: AvatarSize = 'l';

    /** The glyph name. */
    @Input() glyph: string = null;

    /** The glyph name for zoom icon. */
    @Input() zoomGlyph: string = null;

    /** Whether or not to apply a circle style to the Avatar. */
    @Input() circle: boolean = false;

    /** Whether or not to apply a transparent style to the Avatar. */
    @Input() transparent: boolean = false;

    /** Whether or not to apply a placeholder background style to the Avatar. */
    @Input() placeholder: boolean = false;

    /** Whether or not to apply a tile background style to the Avatar. */
    @Input() tile: boolean = false;

    /** Whether or not to apply a border to the Avatar. */
    @Input() border: boolean = false;

    /** A number from 1 to 10 representing the background color of the Avatar. */
    @Input() colorAccent: ColorAccent = null;

    /** Background image url. */
    @Input()
    backgroundImage: string = null;

    /** @hidden */
    @HostBinding('style.background-image')
    get image(): string {
        return 'url(' + this.backgroundImage + ')';
    }

    /** @hidden */
    @HostBinding('attr.role')
    get role(): string {
        return this.zoomGlyph ? 'button' : 'presentation';
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-avatar',
            this.size ? `fd-avatar--${this.size}` : '',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.colorAccent ? `fd-avatar--accent-color-${this.colorAccent}` : '',
            this.circle ? 'fd-avatar--circle' : '',
            this.border ? 'fd-avatar--border' : '',
            this.transparent ? 'fd-avatar--transparent' : '',
            this.placeholder ? 'fd-avatar--placeholder' : '',
            this.tile ? 'fd-avatar--tile' : '',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
