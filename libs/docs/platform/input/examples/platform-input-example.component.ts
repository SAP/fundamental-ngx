import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformInputModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-input-example',
    templateUrl: './platform-input-example.component.html',
    imports: [FormsModule, FdpFormGroupModule, ReactiveFormsModule, PlatformInputModule, ContentDensityDirective]
})
export class PlatformInputExampleComponent implements OnInit {
    formTypesGroupRegister: FormGroup;

    ngOnInit(): void {
        this.formTypesGroupRegister = new FormGroup({});
    }
}
