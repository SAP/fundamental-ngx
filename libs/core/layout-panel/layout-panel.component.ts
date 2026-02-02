import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    ViewEncapsulation
} from '@angular/core';

let layoutPanelUniqueId = 0;

@Component({
    selector: 'fd-layout-panel',
    templateUrl: './layout-panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrl: './layout-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-layout-panel fd-has-display-block',
        '[attr.id]': 'id()',
        '[class.fd-layout-panel--transparent]': 'transparent()',
        '[style.background-image]': 'backgroundImageUrl()'
    }
})
export class LayoutPanelComponent {
    /** Background image of the panel. */
    readonly backgroundImage = input<string | null>();

    /** Id for the layout panel element. */
    readonly id = input('fd-layout-panel-' + ++layoutPanelUniqueId);

    /** Whether the background of the panel should be transparent. */
    readonly transparent = input(false, { transform: booleanAttribute });

    /** @hidden */
    protected readonly backgroundImageUrl = computed(() => {
        const image = this.backgroundImage();
        return image ? `url("${image}")` : null;
    });
}
