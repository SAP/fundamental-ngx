import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    inject,
    input,
    signal
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
    imports: [ButtonComponent]
})
export class PanelComponent {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the Panel is fixed */
    @Input()
    fixed: boolean;

    /** Id of the panel element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-' + panelUniqueId++;

    /** Id of the expand button */
    @Input()
    expandId: string = 'fd-panel-expand-' + panelExpandUniqueId++;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: Nullable<string>;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: Nullable<string>;

    /** Whether the Panel Content is expanded */
    @Input()
    set expanded(value: boolean) {
        this._expanded.set(value);
    }
    get expanded(): boolean {
        return this._expanded();
    }

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Reference to panel content */
    @ContentChild(PanelContentDirective)
    panelContent: Nullable<PanelContentDirective>;

    /** Whether the panel (header and content) is transparent */
    transparent = input(false, { transform: booleanAttribute });

    /** Whether the panel has no border radius */
    noRadius = input(false, { transform: booleanAttribute });

    /** @hidden */
    protected readonly buttonIcon = computed(() =>
        this._expanded() ? 'slim-arrow-down' : this._rtlService?.rtl() ? 'slim-arrow-left' : 'slim-arrow-right'
    );

    /** @hidden */
    private readonly _expanded = signal(false);

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
        this.expandedChange.emit(this.expanded);
    }
}
