import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef
} from '@angular/core';
import { TemplateDirective } from '../../utils/directives/template/template.directive';
import { TitleComponent } from '../../title/title.component';

@Directive()
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    _headerTemplate: TemplateRef<any>;

    /** @hidden */
    _subHeaderTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(TitleComponent)
    set defaultTitleSize(title: TitleComponent) {
        if (title && !title.headerSize) {
            title.headerSize = 5;
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    @ContentChildren(TemplateDirective)
    private _customTemplates: QueryList<TemplateDirective>;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        this._customTemplates.forEach(template => {
            switch (template.getName()) {
                case 'header':
                    this._headerTemplate = template.templateRef;
                    break;
                case 'subheader':
                    this._subHeaderTemplate = template.templateRef;
                    break;
            }
        });
    }
}
