import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {
    applyCssClass,
    CssClassBuilder
} from '../utils/public_api';
import { PanelContentDirective } from './panel-content/panel-content.directive';

let panelUniqueId = 0;
let panelExpandUniqueId = 0;

/**
 * The panel is a container for grouping and displaying information
 * Types: Expandable (default) and Fixed
 * Modes: Tablet/Mobile (default) and Desktop (compact)
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements CssClassBuilder, OnChanges, OnInit {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the Panel is fixed */
    @Input()
    fixed: boolean;

    /** Whether to apply compact mode to the Panel */
    @Input()
    compact: boolean;

    /** Id of the panel element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-' + panelUniqueId++;

    /** Id of the expand button */
    @Input()
    expandId: string = 'fd-panel-expand-' + panelExpandUniqueId++;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: string;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: string;

    /** Whether the Panel Content is expanded */
    @Input()
    expanded: boolean;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Reference to panel content */
    @ContentChild(PanelContentDirective)
    panelContent: PanelContentDirective;

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef, private _elementRef: ElementRef) {
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return ['fd-panel', this.fixed ? 'fd-panel--fixed' : '', this.compact ? 'fd-panel--compact' : '', this.class];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** Methods that toggles the Panel Content */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
}
