import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-textarea-basic-example',
    templateUrl: './platform-textarea-basic-example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformTextAreaModule,
        ContentDensityDirective,
        FormLabelComponent,
        FormMessageComponent
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
