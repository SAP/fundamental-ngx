import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectAttributeComponent } from '@fundamental-ngx/core/object-attribute';

@Component({
    selector: 'fd-object-attribute-link-example',
    templateUrl: './object-attribute-link-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ObjectAttributeComponent]
})
export class ObjectAttributeLinkExampleComponent {
    constructor(private router: Router) {}

    navigationClick(): void {
        this.router.navigate(['/core/home']);
    }

    linkClick(): void {
        alert('Generic action triggered!!!');
    }
}
