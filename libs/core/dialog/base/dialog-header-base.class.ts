import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef,
    inject
} from '@angular/core';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { DEFAULT_TITLE_SIZE } from '@fundamental-ngx/core/title';

@Directive({
    providers: [
        {
            provide: DEFAULT_TITLE_SIZE,
            useValue: 5
        }
    ]
})
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    headerTemplate: TemplateRef<any>;

    /** @hidden */
    subHeaderTemplate: TemplateRef<any>;

    /** @hidden */
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this._assignCustomTemplates();
    }

    /** @hidden Assign custom templates */
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
        this._changeDetectorRef.markForCheck();
    }
}
