import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-input-example',
    templateUrl: './platform-input-example.component.html'
})
export class PlatformInputExampleComponent implements OnInit {
    formTypesGroupRegister: FormGroup;

    ngOnInit(): void {
        this.formTypesGroupRegister = new FormGroup({});
    }
}
