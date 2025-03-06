import { Component } from '@angular/core';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-object-status-large-example',
    templateUrl: './object-status-large-example.component.html',
    styleUrls: ['./object-status-examples.component.scss'],
    imports: [ObjectStatusComponent]
})
export class ObjectStatusLargeExampleComponent {
    showAlert(index: string): void {
        alert('clicked alert large at index:- ' + index);
    }
}
