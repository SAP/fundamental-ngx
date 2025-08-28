import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent, HeaderTabsComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-rtl-service-header',
    templateUrl: './rtl-service-header.component.html',
    imports: [HeaderComponent, RouterOutlet, DescriptionComponent, HeaderTabsComponent]
})
export class RtlServiceHeaderComponent {
    falseSignal = signal(false);
}
