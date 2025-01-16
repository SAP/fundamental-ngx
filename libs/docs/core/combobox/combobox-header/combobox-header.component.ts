import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-combobox-input-header',
    templateUrl: './combobox-header.component.html',
    styleUrls: ['./combobox-header.component.scss'],
    imports: [
        DocPageComponent,
        HeaderComponent,
        DescriptionComponent,
        MessageStripComponent,
        RouterLink,
        ImportComponent,
        HeaderTabsComponent
    ]
})
export class ComboboxHeaderComponent {}
