import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { BarModule } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fd-bar-with-title-example',
    templateUrl: './bar-with-title-example.component.html',
    standalone: true,
    imports: [BarModule, TitleComponent, AvatarModule]
})
export class BarWithTitleExampleComponent {}
