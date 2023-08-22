import { Component } from '@angular/core';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';

@Component({
    selector: 'fd-layout-grid-responsive-example',
    templateUrl: './layout-grid-responsive-example.component.html',
    standalone: true,
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent]
})
export class LayoutGridResponsiveExampleComponent {}
