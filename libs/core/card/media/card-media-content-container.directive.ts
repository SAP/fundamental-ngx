import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-content-container]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class CardMediaContentContainerDirective {
    /**
     * Whether the media content container is an overlay
     * Default value: false
     */
    readonly isOverlay = input(false, {
        transform: booleanAttribute
    });

    /**
     * Shell Category Colors
     * Available values: number from 1 to 16
     */
    readonly shellColor = input<number | null | undefined>();

    /**
     * Legend Background Colors
     * Available values: number from 1 to 20
     */
    readonly legendColor = input<number | null | undefined>();

    /** @hidden */
    protected readonly cssClass = computed(() => {
        let classes = CLASS_NAME.cardMediaContentContainer;
        if (this.isOverlay()) {
            classes += ` ${CLASS_NAME.cardMediaContentContainerOverlay}`;
        }

        const shell = this.shellColor();
        if (shell) {
            classes += ` ${CLASS_NAME.cardMediaContentContainer}--bg-shell-${shell}`;
        }

        const legend = this.legendColor();
        if (legend) {
            classes += ` ${CLASS_NAME.cardMediaContentContainer}--bg-legend-${legend}`;
        }

        return classes;
    });
}
