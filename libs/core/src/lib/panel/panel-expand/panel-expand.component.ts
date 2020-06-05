import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

let expandButtonUniqueId: number = 0;

/**
 * ```html
 * <div fd-panel-expand></div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel-expand]',
    templateUrl: './panel-expand.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelExpandComponent {
    /** @hidden */
    @HostBinding('class.fd-panel__expand')
    readonly fdPanelExpandClass: boolean = true;

    /** Whether to apply compact mode to the button that shows/hides the Panel content. */
    @Input()
    compact: boolean = false;

    /** Whether the panel content is expanded. */
    @Input()
    expanded: boolean = false;

    /** aria-label attribute of the expand button. */
    @Input()
    ariaLabel: string = null;

    /** aria-labelledby attribute of the expand button. */
    @Input()
    ariaLabelledBy: string = null;

    /** Id for the expand button. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-panel-expand-' + expandButtonUniqueId++;

    /** An event emitted when the button is clicked.  */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Methods that toggles the content of the Panel and emits the value to the parent. */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
}
