import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-input-custom-example',
    templateUrl: './file-input-custom-example.component.html',
    styleUrls: ['./file-input-custom-example.component.scss']
})
export class FileInputCustomExampleComponent {

    files: File[] = [];
    state: string = 'default';

    selectHandler(passedFiles) {
        passedFiles.forEach(file => {
            if (this.files.filter(eFile => (file.name === eFile.name)).length === 0) {
                this.files.push(file);
            }
        });
        this.state = 'default';
    }

    removeFile(index: number) {
        this.files.splice(index, 1);
    }

}
