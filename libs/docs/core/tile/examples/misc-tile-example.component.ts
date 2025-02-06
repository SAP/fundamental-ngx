import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TileModule } from '@fundamental-ngx/core/tile';

@Component({
    selector: 'fd-misc-tile-example',
    templateUrl: './misc-tile-example.component.html',
    styles: [
        `
            .fddoc-container {
                display: flex;
                justify-content: space-around;
                padding-bottom: 1rem;
            }
        `
    ],
    imports: [TileModule, ButtonComponent]
})
export class MiscTileExampleComponent {
    onTileClick(): void {
        console.log('tile clicked!');
    }
}
