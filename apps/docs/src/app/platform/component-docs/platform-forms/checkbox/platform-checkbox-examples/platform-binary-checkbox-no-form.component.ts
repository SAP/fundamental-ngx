import { Component } from '@angular/core';

@Component({
    selector: 'fdp-binary-checkbox-no-form',
    templateUrl: 'platform-binary-checkbox-no-form.component.html'
})
export class PlatformChekboxNoFormComponent {
    orion = true;
    cygnus = false;
    lyra = true;
    gemini = false;

    public checkedChangeFunction(event: any): void {}

    public indeterminateChangeFunction(event: any): void {}

    public changeFunction(event: any): void {}
}
