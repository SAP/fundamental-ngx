import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    ]
})
export class CustomFacetExampleComponent {}
