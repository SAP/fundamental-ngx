import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { PanelExpandComponent } from '../panel-expand/panel-expand.component';


let panelHeaderUniqueId: number = 0;

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

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-header-' + panelHeaderUniqueId++;

    /** 
     * An event emitted to the parent PaneComponent 
     * with a boolean value captured from the child PanelExpandComponent 
     * that controls the expanded state of the Panel Content.
     */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChild(PanelExpandComponent) panelExpand: PanelExpandComponent;

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.panelExpand) {
            this.panelExpand.expandedChange.subscribe(
                (value: boolean) => this.expandedChange.emit(value)
            );
        }
    }
}
