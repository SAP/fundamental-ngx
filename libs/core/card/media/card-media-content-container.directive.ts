import { Directive, HostBinding, booleanAttribute, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { isTruthy } from '../utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-content-container]',
    standalone: true,
    host: {
        class: 'fd-card__media-content-container',
        '[class.fd-card__media-content-container--overlay]': 'isOverlay()'
    }
})
export class CardMediaContentContainerDirective {
    /** @hidden */
    @HostBinding('class')
    get cssClass(): string[] {
        return [
            this.shellColor() && `fd-card__media-content-container--bg-shell-${this.shellColor()}`,
            this.legendColor() && `fd-card__media-content-container--bg-legend-${this.legendColor()}`
        ].filter(isTruthy);
    }

    /**
     * Whether the media content container is an overlay
     * Default value: false
     */
    isOverlay = input(false, {
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
