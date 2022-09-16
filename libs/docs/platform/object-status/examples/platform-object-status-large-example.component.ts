import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-object-status-large-example',
    templateUrl: './platform-object-status-large-example.component.html',
    styleUrls: ['./platform-object-status-large-example.component.scss']
})
export class PlatformObjectStatusLargeExampleComponent {
    showAlert(): void {
        alert('clicked alert large');
    }
}
