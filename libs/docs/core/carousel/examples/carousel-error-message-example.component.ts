import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';

@Component({
    selector: 'fd-carousel-error-message-example',
    templateUrl: './carousel-error-message-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, MessagePageModule]
})
export class CarouselErrorMessageExampleComponent {}
