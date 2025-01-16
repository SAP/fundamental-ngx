import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-bar-with-title-example',
    templateUrl: './bar-with-title-example.component.html',
    imports: [BarModule, TitleComponent, AvatarComponent]
})
export class BarWithTitleExampleComponent {}
