import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-input-max-example',
    templateUrl: './file-input-max-example.component.html'
})
export class FileInputMaxExampleComponent {
    files: File[];
    invalid_files: File[];
}
