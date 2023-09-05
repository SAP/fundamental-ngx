import { Component } from '@angular/core';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-large-example',
    templateUrl: './platform-object-status-large-example.component.html',
    styleUrls: ['./platform-object-status-large-example.component.scss'],
    standalone: true,
    imports: [PlatformObjectStatusModule]
})
export class PlatformObjectStatusLargeExampleComponent {
    showAlert(): void {
        alert('clicked alert large');
    }
}
