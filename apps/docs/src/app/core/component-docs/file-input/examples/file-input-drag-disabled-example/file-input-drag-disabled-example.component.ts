import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-input-drag-disabled-example',
    templateUrl: './file-input-drag-disabled-example.component.html'
})
export class FileInputDragDisabledExampleComponent {
    files: File[];
    invalidFiles: File[];
}
