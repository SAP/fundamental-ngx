import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    HostBinding,
    inject,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {
    applyCssClass,
    ColorAccent,
    CssClassBuilder,
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItemDirective,
    Nullable,
    Size
} from '@fundamental-ngx/cdk/utils';
import { AVATAR_GROUP_HOST_CONFIG } from '../tokens';

/**
 * Avatar group overflow button component.
 * This is used for the overflow button template.
 * Although any content can be projected as the overflow button, this component provides some styling and accessibility features.
 */
@Component({
    selector: 'fd-avatar-group-overflow-button',
    template: ` <ng-content></ng-content>`,
    host: {
        role: 'button'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: forwardRef(() => AvatarGroupOverflowButtonComponent)
        }
    ]
})
export class AvatarGroupOverflowButtonComponent
    extends FocusableItemDirective
    implements OnChanges, OnInit, CssClassBuilder
{
    /**
     * Size of the overflow button.
     */
    @Input()
    size: Size = 'l';

    /**
     * Whether the overflow button should be displayed as a circle.
     */
    @Input()
    @HostBinding('class.fd-avatar--circle')
    circle = false;

    /**
     * A number from 1 to 10 representing the background color of the Avatar.
     */
    @Input() colorAccent: Nullable<ColorAccent> = null;

    /**
     * The class to apply to the host element.
     **/
    @Input()
    class: Nullable<string>;

    /** @hidden */
    constructor() {
        super();
        this.setFocusable(inject(AVATAR_GROUP_HOST_CONFIG).type === 'individual');
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class || '',
            'fd-avatar fd-avatar--overflow',
            'fd-avatar--' + this.size,
            this.colorAccent ? 'fd-avatar--' + this.colorAccent : ''
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
