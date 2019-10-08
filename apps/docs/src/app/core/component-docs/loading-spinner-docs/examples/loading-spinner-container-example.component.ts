import { Component } from '@angular/core';

@Component({
    selector: 'fd-loading-spinner-container-example',
    templateUrl: './loading-spinner-container-example.component.html',
    styles: [
        `.fd-panel {
            min-height: 50px;
        }`
    ]
})
export class LoadingSpinnerContainerExampleComponent {

    loading = true;

}
