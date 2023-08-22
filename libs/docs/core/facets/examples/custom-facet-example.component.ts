import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { FacetModule } from '@fundamental-ngx/core/facets';

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
    standalone: true,
    imports: [FacetModule, ObjectStatusModule]
})
export class CustomFacetExampleComponent {}
