import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-input-example',
    templateUrl: './file-input-example.component.html'
})
export class FileInputExampleComponent {
    files: FileList; // You can also receive the files as a File[].
}
