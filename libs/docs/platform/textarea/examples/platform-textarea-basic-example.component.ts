import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fdp-platform-textarea-basic-example',
    templateUrl: './platform-textarea-basic-example.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgIf,
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        ContentDensityDirective,
        FormLabelModule,
        FormMessageModule
    ]
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
