import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

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
    imports: [FacetModule, ObjectStatusComponent]
})
export class CustomFacetExampleComponent {}
