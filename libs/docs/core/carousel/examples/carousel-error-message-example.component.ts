import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-error-message-example',
    templateUrl: './carousel-error-message-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CarouselComponent, MessagePageModule]
})
export class CarouselErrorMessageExampleComponent {}
