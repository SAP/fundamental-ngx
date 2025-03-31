import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-subline-standard-example',
    templateUrl: './list-subline-standard-example.component.html',
    imports: [ListModule, AvatarComponent]
})
export class ListSublineStandardExampleComponent {}
