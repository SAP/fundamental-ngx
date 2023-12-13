import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef
} from '@angular/core';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { TitleComponent, TitleToken } from '@fundamental-ngx/core/title';

@Directive()
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @ignore */
    headerTemplate: TemplateRef<any>;

    /** @ignore */
    subHeaderTemplate: TemplateRef<any>;

    /** @ignore */
    @ContentChild(TitleToken)
    set defaultTitleSize(title: TitleComponent) {
        if (title && !title.headerSize) {
            title.headerSize = 5;
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @ignore */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @ignore */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @ignore */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @ignore Assign custom templates */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
            switch (template.name) {
                case 'header':
                    this.headerTemplate = template.templateRef;
                    break;
                case 'subheader':
                    this.subHeaderTemplate = template.templateRef;
                    break;
            }
        });
        this._changeDetectorRef.detectChanges();
    }
}
