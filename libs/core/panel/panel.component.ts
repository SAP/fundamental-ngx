import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    contentChild,
    inject,
    input,
    linkedSignal,
    output
} from '@angular/core';

import { Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { PanelContentDirective } from './panel-content/panel-content.directive';

let panelUniqueId = 0;
let panelExpandUniqueId = 0;

/**
 * The panel is a container for grouping and displaying information
 * Types: Expandable (default) and Fixed
 * Modes: Tablet/Mobile (default) and Desktop (compact)
 */
@Component({
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrl: './panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    imports: [ButtonComponent],
    host: {
        '[attr.id]': 'id()'
    }
})
export class PanelComponent {
    /** User's custom classes */
    readonly class = input<string>('');

    /** Whether the Panel is fixed */
    readonly fixed = input(false, { transform: booleanAttribute });

    /** Id of the panel element. */
    readonly id = input('fd-panel-' + panelUniqueId++);

    /** Id of the expand button */
    readonly expandId = input('fd-panel-expand-' + panelExpandUniqueId++);

    /** aria-label of the expand button */
    readonly expandAriaLabel = input<Nullable<string>>(null);

    /** aria-labelledby of the expand button */
    readonly expandAriaLabelledBy = input<Nullable<string>>(null);

    /** @hidden Signal input backing the expanded state; template uses [expanded]="..." via alias. */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly _expandedInput = input(false, { alias: 'expanded', transform: booleanAttribute });

    /** Output event triggered when the Expand button is clicked */
    readonly expandedChange = output<boolean>();

    /** Whether the panel (header and content) is transparent */
    readonly transparent = input(false, { transform: booleanAttribute });

    /** Whether the panel has no border radius */
    readonly noRadius = input(false, { transform: booleanAttribute });

    /** Reference to panel content */
    readonly panelContent = contentChild(PanelContentDirective);

    /** Whether the Panel Content is expanded */
    set expanded(value: boolean) {
        this._expanded.set(value);
    }

    get expanded(): boolean {
        return this._expanded();
    }

    /** @hidden */
    protected readonly _expanded = linkedSignal(() => this._expandedInput());

    /** @hidden */
    protected readonly buttonIcon = computed(() =>
        this._expanded() ? 'slim-arrow-down' : this._rtlService?.rtl() ? 'slim-arrow-left' : 'slim-arrow-right'
    );

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** Methods that toggles the Panel Content */
    toggleExpand(): void {
        this._expanded.update((expanded) => !expanded);
        this.expandedChange.emit(this._expanded());
    }
}
