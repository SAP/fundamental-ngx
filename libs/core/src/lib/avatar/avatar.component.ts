import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

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
export class AvatarComponent implements OnChanges, OnInit {
    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the Avatar. */
    @Input()
    id: string = `fd-avatar-${avatarUniqueId++}`;

    /** Aria-label for Avatar */
    @Input()
    ariaLabel: string = null;

    /** Aria-Labelledby for element describing Avatar */
    @Input()
    ariaLabelledby: string = null;

    /**
     * The size of the Avatar.
     * Available sizes are  *xs*, *s*, *m*, *l* and *xl*.
     */
    @Input() size: AvatarSize = 'l';

    /** 
     * The glyph name. 
     */
    @Input() glyph: string = null;

    /**
     * Whether to apply a circle style to the Avatar.
     */
    @Input() circle: boolean = false;

    /**
     * Whether to apply a transparent style to the Avatar.
     */
    @Input() transparent: boolean = false;

    /**
     * Whether to apply a placeholder background style to the Avatar.
     */
    @Input() placeholder: boolean = false;

    /**
     * Whether to apply a tile background style to the Avatar.
     */
    @Input() tile: boolean = false;

    /**
     * Whether to apply a border to the Avatar.
     */
    @Input() border: boolean = false;

    /**
     * A number specifying the background color of the Avatar.
     * Available colors: numbers from 1 to 10.
     */
    @Input() colorAccent: ColorAccent = null;

    /** 
     * Background image url. 
     */
    @Input()
    image: string = null;



    /** @hidden */
    constructor() {}

    /** @hidden */
    ngOnInit(): void {
        
    }

    /** @hidden */
    ngOnChanges(): void {
        
    }


}
