import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { PanelExpandComponent } from '../panel-expand/panel-expand.component';

/**
 * Applies the panel header style to a div element
 * and serves as a container for the Panel Expand component, 
 * the Panel Title and an optional Toolbar component.
 *
 * ```html
 * <div fd-panel-header>
 *   <div fd-panel-expand></div>
 *   <h5 fd-panel-title>Panel Header</h5>
 *   <div>Other content</div>
 * </div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel-header]',
    templateUrl: './panel-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHeaderComponent implements AfterViewInit {
    /** @hidden */
    @HostBinding('class.fd-panel__header')
    readonly fdPanelHeaderClass: boolean = true;

    /** 
     * An event emitted to the parent PaneComponent 
     * with a boolean value captured from the child PanelExpandComponent 
     * that controls the expanded state of the Panel Content.
     */
    @Output()
    expandedValue: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChild(PanelExpandComponent) panelExpand: PanelExpandComponent;

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.panelExpand) {
            this.panelExpand.expandedValue.subscribe(
                (value: boolean) => this.expandedValue.emit(value)
            );
        }
    }
}
