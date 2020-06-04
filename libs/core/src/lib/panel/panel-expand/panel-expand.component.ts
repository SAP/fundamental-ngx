import { 
    ChangeDetectionStrategy,
    Component, 
    EventEmitter, 
    Input, 
    Output,
    ViewEncapsulation 
} from '@angular/core';

/**
 * ```html
 * <div fd-panel-expand></div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel-expand]',
    host: {
        class: 'fd-panel__expand'
    },
    templateUrl: './panel-expand.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelExpandComponent {

    /** Whether to apply compact mode to the button that shows/hides the Panel content. */
    @Input()
    compact: boolean = false;

    /** An event emitted when the button is clicked.  */
    @Output()
    expandedValue = new EventEmitter<boolean>();

    /** @hidden Whether the panel content is expanded. */
    isExpanded: boolean = false;

    /** Methods that toggles the content of the Panel and emits the value to the parent. */
    toggleExpand(): void {
        this.isExpanded = !this.isExpanded;
        this.expandedValue.emit(this.isExpanded);
    }
}
