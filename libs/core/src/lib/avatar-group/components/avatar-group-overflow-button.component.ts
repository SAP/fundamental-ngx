import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { ColorAccent, Nullable, Size } from '@fundamental-ngx/cdk/utils';
import { NgClass } from '@angular/common';

@Component({
    selector: 'fd-avatar-group-overflow-button',
    template: `<ng-content></ng-content>`,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        role: 'button',
        '[class.fd-avatar--circle]': 'circle'
    },
    hostDirectives: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AvatarGroupOverflowButtonComponent implements OnChanges, OnInit {
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
