import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core';
import { FacetComponent, FacetContentComponent } from '@fundamental-ngx/core/facets';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-form-facet-example',
    templateUrl: './form-facet-example.component.html',
    styles: [
        `
            .fd-docs-flex {
                display: flex;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FacetComponent, FacetContentComponent, FormLabelComponent, TextComponent, LinkComponent, IconComponent]
})
export class FormFacetExampleComponent {}
