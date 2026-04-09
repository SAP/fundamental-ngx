import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';

@Component({
    selector: 'fd-card-media',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        role: 'group',
        '[class]': 'cssClass()',
        '[attr.aria-roledescription]': 'ariaRoleDescription()'
    }
})
export class CardMediaComponent {
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
    shellColor = input<number | null | undefined>();

    /**
     * Legend Background Colors
     * Available values: number from 1 to 20
     */
    legendColor = input<number | null | undefined>();

    /** @hidden */
    protected readonly cssClass = computed(() => {
        let classes = 'fd-card__media';
        if (this.hasPadding()) {
            classes += ' fd-card__media--with-padding';
        }
        const shell = this.shellColor();
        if (shell) {
            classes += ` fd-card__media--bg-shell-${shell}`;
        }
        const legend = this.legendColor();
        if (legend) {
            classes += ` fd-card__media--bg-legend-${legend}`;
        }
        return classes;
    });
}
