import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ExampleLayoutGridBlockComponent } from './example-layout-grid-block.component';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';

@Component({
    selector: 'fd-layout-grid-row-example',
    templateUrl: './layout-grid-row-example.component.html',
    standalone: true,
    imports: [LayoutGridModule, ExampleLayoutGridBlockComponent, NgFor]
})
export class LayoutGridRowExampleComponent {}
