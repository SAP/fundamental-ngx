import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'fdp-platform-object-attribute-link-example',
    templateUrl: './platform-object-attribute-link-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformObjectAttributeLinkExampleComponent {
    constructor(private router: Router) {}

    navigationClick(): void {
        this.router.navigate(['/platform/home']);
    }

    linkClick(): void {
        alert('Generic action triggered!!!');
    }
}
