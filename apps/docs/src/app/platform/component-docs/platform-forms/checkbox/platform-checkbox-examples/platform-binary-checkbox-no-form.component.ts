import { Component } from '@angular/core';

@Component({
    selector: 'fdp-binary-checkbox-no-form',
    templateUrl: 'platform-binary-checkbox-no-form.component.html'
})
export class PlatformChekboxNoFormComponent {
    orion: boolean = true;
    cygnus: boolean = false;
    lyra: boolean = true;
    gemini: boolean = false;
}
