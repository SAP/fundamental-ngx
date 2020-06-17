import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { PanelService } from './panel.service';

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
    providers: [PanelService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements CssClassBuilder, OnChanges, OnInit, OnDestroy {
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

    /** Whether the Panel Content is expanded */
    @Input() expanded: boolean;

    /** @hidden */
    private _subscription: Subscription;

    /** @hidden */
    constructor(
        private _cdRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _panelService: PanelService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._subscription = this._panelService.expanded$.subscribe((value) => {
            this.expanded = value;
            this._cdRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
        this._panelService.updateExpanded(this.expanded);

        if (changes && changes.expanded) {
            this._panelService.updateExpanded(this.expanded);
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
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
