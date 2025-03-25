import { Component } from '@angular/core';
import { TileModule } from '@fundamental-ngx/core/tile';

@Component({
    selector: 'fd-launch-tile-example',
    templateUrl: './launch-tile-example.component.html',
    styleUrls: ['./launch-tile-example.component.scss'],
    imports: [TileModule]
})
export class LaunchTileExampleComponent {
    tileClick(): void {
        alert('Refresh clicked!');
    }
}
