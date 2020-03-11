import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren, ElementRef, Input,
    QueryList,
    TemplateRef
} from '@angular/core';
import { TemplateDirective } from '../../utils/directives';

/**
 * Applies fundamental layout and styling to the contents of a dialog header.
 *
 * ```html
 * <fd-dialog-header>
 *     <h1 fd-dialog-title>Title</h1>
 *     <button fd-dialog-close-btn></button>
 * </fd-dialog-header>
 * ```
 */
@Component({
    selector: 'fd-dialog-header',
    templateUrl: './dialog-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHeaderComponent implements AfterContentInit {

    @Input()
    mobile: boolean = false;

    @Input()
    draggable: boolean = false;

    headerTemplate: TemplateRef<any>;

    subHeaderTemplate: TemplateRef<any>;


    @ContentChildren(TemplateDirective) customTemplates: QueryList<TemplateDirective>;

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _elementRef: ElementRef) {
    }

    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    private _assignCustomTemplates(): void {
        this.customTemplates.forEach(template => {
            switch (template.getName()) {
                case 'header':
                    this.headerTemplate = template.templateRef;
                    break;
                case 'subheader':
                    this.subHeaderTemplate = template.templateRef;
                    break;
            }
        });
    }
}
