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
 * Applies fundamental layout and styling to the contents of a dialog footer.
 *
 * ```html
 * <fd-dialog-footer>
 *     <button fd-dialog-decisive-button>Do action</button>
 * </fd-dialog-footer>
 * ```
 */
@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent implements AfterContentInit {

    /** @hidden */
    footerTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(TemplateDirective) customTemplates: QueryList<TemplateDirective>;

    constructor(@Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig) { }

    /** @hidden */
    ngAfterContentInit() {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find(template => template.getName() === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
    }
}
