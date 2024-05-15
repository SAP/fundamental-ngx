import { ChangeDetectionStrategy, Component, HostBinding, booleanAttribute, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { isTruthy } from '../utils';

@Component({
    selector: 'fd-card-media',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        role: 'group',
        class: 'fd-card__media',
        '[class.fd-card__media--with-padding]': 'hasPadding()',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardMediaComponent {
    /** @hidden */
    @HostBinding('class')
    get cssClass(): string[] {
        return [
            this.shellColor() && `fd-card__media--bg-shell-${this.shellColor()}`,
            this.legendColor() && `fd-card__media--bg-legend-${this.legendColor()}`
        ].filter(isTruthy);
    }

    /**
     * aria-roledescription for the container
     * default: 'Card Media Block'
     */
    ariaRoleDescription = input('Card Media Block');

    /**
     * Whether the media container comes with a 1rem padding
     * Default value: false
     */
    hasPadding = input(false, {
        transform: booleanAttribute
    });

    /**
     * Shell Category Colors
     * Available values: number from 1 to 16
     */
    shellColor = input<Nullable<number>>();

    /**
     * Legend Background Colors
     * Available values: number from 1 to 20
     */
    legendColor = input<Nullable<number>>();
}
