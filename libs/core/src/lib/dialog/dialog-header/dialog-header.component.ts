import {
    AfterContentInit,
    Component,
    ContentChildren,
    Inject,
    Optional,
    QueryList,
    TemplateRef
} from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';

/**
 * Applies fundamental layout and styling to the contents of a dialog header.
 *
 * ```html
 * <fd-dialog-header>
 *     <h1 fd-dialog-title>Title</h1>
 *     <button fd-dialog-close-button></button>
 * </fd-dialog-header>
 * ```
 */
@Component({
    selector: 'fd-dialog-header',
    templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent implements AfterContentInit {

    /** @hidden */
    headerTemplate: TemplateRef<any>;

    /** @hidden */
    subHeaderTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(TemplateDirective) customTemplates: QueryList<TemplateDirective>;

    constructor(@Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig) { }


    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
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
