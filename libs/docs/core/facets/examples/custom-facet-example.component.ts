import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-custom-facet-example',
    templateUrl: './custom-facet-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .fd-docs-custom-facet-paragraph {
                width: 50%;
            }

            .fd-docs-custom-facet-paragraph-alignment {
                display: flex;
                flex-direction: column;
            }
        `
    ],
    imports: [
        FacetModule,
        ObjectStatusComponent,
        TitleComponent,
        ButtonComponent,
        IconComponent,
        LinkComponent,
        FormLabelComponent,
        TextComponent
    ]
})
export class CustomFacetExampleComponent {}
