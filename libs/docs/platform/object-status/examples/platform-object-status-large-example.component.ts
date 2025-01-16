import { Component } from '@angular/core';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-large-example',
    templateUrl: './platform-object-status-large-example.component.html',
    styleUrls: ['./platform-object-status-large-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusLargeExampleComponent {
    showAlert(): void {
        alert('clicked alert large');
    }
}
