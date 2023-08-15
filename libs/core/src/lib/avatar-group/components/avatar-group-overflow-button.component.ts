import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnChanges, OnInit } from '@angular/core';
import {
    ColorAccent,
    DestroyedService,
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
        role: 'button',
        '[class.fd-avatar--circle]': 'circle'
    },
    hostDirectives: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: forwardRef(() => AvatarGroupOverflowButtonComponent)
        },
        DestroyedService
    ]
})
export class AvatarGroupOverflowButtonComponent extends FocusableItemDirective implements OnChanges, OnInit {
    /**
     * Size of the overflow button.
     */
    @Input()
    size: Size = 'l';

    /**
     * Whether the overflow button should be displayed as a circle.
     */
    @Input()
    circle = false;

    /**
     * A number from 1 to 10 representing the background color of the Avatar.
     */
    @Input() colorAccent: Nullable<ColorAccent> = null;

    /** @hidden */
    constructor() {
        super();
        this.fdkFocusableItem = inject(AVATAR_GROUP_HOST_CONFIG).type === 'individual';
    }

    /** @hidden */
    private ngClassDirective = inject(NgClass);

    /** @hidden */
    private updateClass(): void {
        this.ngClassDirective.klass = [
            'fd-avatar fd-avatar--overflow',
            'fd-avatar--' + this.size,
            this.colorAccent ? 'fd-avatar--' + this.colorAccent : ''
        ].join(' ');
        this.ngClassDirective.ngDoCheck();
    }

    /** @hidden */
    ngOnInit(): void {
        this.updateClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.updateClass();
    }
}
