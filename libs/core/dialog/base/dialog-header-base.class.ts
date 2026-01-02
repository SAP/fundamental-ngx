import {
    AfterContentInit,
    ChangeDetectorRef,
    ComponentRef,
    ContentChild,
    ContentChildren,
    Directive,
    QueryList,
    TemplateRef,
    inject
} from '@angular/core';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { TitleComponent, TitleToken } from '@fundamental-ngx/core/title';

@Directive()
export abstract class DialogHeaderBase implements AfterContentInit {
    /** @hidden */
    @ContentChild(TitleToken)
    set defaultTitleSize(title: TitleComponent) {
        if (title && !title.headerSize()) {
            // Get the component instance's ComponentRef for setting signal inputs
            const componentRef = (title as any)._componentRef as ComponentRef<TitleComponent>;
            if (componentRef) {
                componentRef.setInput('headerSize', 5);
            }
        }
    }

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
