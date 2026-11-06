import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarLeftDirective, BarMiddleDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-list-search-results-example',
    templateUrl: './list-search-results-example.component.html',
    imports: [
        ListModule,
        ButtonComponent,
        PopoverModule,
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        TitleComponent,
        TextComponent,
        InfoLabelComponent,
        AvatarComponent
    ]
})
export class ListSearchResultsExampleComponent {}
