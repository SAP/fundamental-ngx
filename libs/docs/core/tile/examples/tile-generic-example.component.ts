import { Component } from '@angular/core';
import { TileModule } from '@fundamental-ngx/core/tile';

@Component({
    selector: 'fd-tile-generic-example',
    templateUrl: './tile-generic-example.component.html',
    styles: [
        `
            .fddoc-container {
                display: flex;
                justify-content: space-around;
                padding-bottom: 1rem;
            }
        `
    ],
    imports: [TileModule]
})
export class TileGenericExampleComponent {}
