import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Inject,
    Optional,
    QueryList,
    TemplateRef
} from '@angular/core';
import { TemplateDirective } from '../../utils/directives';
import { DIALOG_CONFIG, DialogConfig } from '../../..';

/**
 * Applies fundamental layout and styling to the contents of a dialog footer.
 *
 * ```html
 * <fd-dialog-footer>
 *     <button>Do action</button>
 * </fd-dialog-footer>
 * ```
 */
@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent implements AfterContentInit {

    footerTemplate: TemplateRef<any>;

    @ContentChildren(TemplateDirective) customTemplates: QueryList<TemplateDirective>;

    constructor(@Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig) { }

    ngAfterContentInit() {
        this._assignCustomTemplates();
    }

    private _assignCustomTemplates(): void {
        const footerTemplate = this.customTemplates.find(template => template.getName() === 'footer');
        this.footerTemplate = footerTemplate ? footerTemplate.templateRef : undefined;
    }
}
