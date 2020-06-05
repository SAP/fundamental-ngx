import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { PanelHeaderComponent } from './panel-header/panel-header.component';

let panelUniqueId: number = 0;

/**
 * The panel is a container for grouping and displaying information
 * Types: Expandable (default) and Fixed
 * Modes: Tablet/Mobile (default) and Desktop (compact)
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel]',
    templateUrl: './panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements AfterViewInit, CssClassBuilder, OnChanges, OnInit {
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

    /** @hidden */
    @ContentChild(PanelHeaderComponent) panelHeader: PanelHeaderComponent;

    /** Whether the Panel Content is expanded */
    @Input()
    expanded: boolean = false;

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef, private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.panelHeader.expandedChange.subscribe((value: boolean) => {
            this.expanded = value;
            this._cdRef.detectChanges();
        });
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return ['fd-panel', this.fixed ? 'fd-panel--fixed' : '', this.compact ? 'fd-panel--compact' : '', this.class]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
