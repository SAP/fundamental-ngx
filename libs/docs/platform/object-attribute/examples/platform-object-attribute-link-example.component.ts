import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';

@Component({
    selector: 'fdp-platform-object-attribute-link-example',
    templateUrl: './platform-object-attribute-link-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PlatformObjectAttributeModule]
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
