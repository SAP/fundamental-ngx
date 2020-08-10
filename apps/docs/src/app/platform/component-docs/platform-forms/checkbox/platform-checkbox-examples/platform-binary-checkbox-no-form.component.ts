import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'fdp-platform-binary-checkbox-no-form',
    templateUrl: 'platform-binary-checkbox-no-form.component.html'
})
export class PlatformChekboxNoFormComponent implements AfterViewInit {
    orion = true;
    cygnus = false;
    lyra = true;
    gemini = false;

    constructor(private _cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    public checkedChangeFunction(event: any): void {}

    public indeterminateChangeFunction(event: any): void {}

    public changeFunction(event: any): void {}
}
