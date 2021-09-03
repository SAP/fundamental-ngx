import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-textarea-basic-example',
    templateUrl: './platform-textarea-basic-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformTextareaBasicExampleComponent {
    form: FormGroup;
    data: ReadonlyDescriptionObject;

    constructor() {
        this.form = new FormGroup({});

        this.data = new ReadonlyDescriptionObject(
            'This is a readonly description where you can scroll down to read but cannot edit anything. ' +
                'This is a readonly description where you can scroll down to read but cannot edit anything. ' +
                'This is a readonly description where you can scroll down to read but cannot edit anything. ' +
                'This is a readonly description where you can scroll down to read but cannot edit anything. ' +
                'This is a readonly description where you can scroll down to read but cannot edit anything. ' +
                'This is a readonly description where you can scroll down to read but cannot edit anything.'
        );
    }
}
class ReadonlyDescriptionObject {
    constructor(public readonlyDescription: string) {}
}
