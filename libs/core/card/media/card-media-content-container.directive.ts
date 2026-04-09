import { Directive, booleanAttribute, computed, input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-content-container]',
    standalone: true,
    host: {
        '[class]': 'cssClass()'
    }
})
export class CardMediaContentContainerDirective {
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
    shellColor = input<number | null | undefined>();

    /**
     * Legend Background Colors
     * Available values: number from 1 to 20
     */
    legendColor = input<number | null | undefined>();

    /** @hidden */
    protected readonly cssClass = computed(() => {
        let classes = 'fd-card__media-content-container';
        if (this.isOverlay()) {
            classes += ' fd-card__media-content-container--overlay';
        }

        const shell = this.shellColor();
        if (shell) {
            classes += ` fd-card__media-content-container--bg-shell-${shell}`;
        }

        const legend = this.legendColor();
        if (legend) {
            classes += ` fd-card__media-content-container--bg-legend-${legend}`;
        }

        return classes;
    });
}
