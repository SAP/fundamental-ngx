import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-bar-with-title-example',
    templateUrl: './bar-with-title-example.component.html',
    standalone: true,
    imports: [BarModule, TitleComponent, AvatarModule]
})
export class BarWithTitleExampleComponent {}
