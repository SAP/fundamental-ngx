import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ListModule } from '@fundamental-ngx/core/list';
import {
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarLabelDirective,
    ToolbarSpacerDirective
} from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-carousel-auto-slides-example',
    templateUrl: './carousel-auto-slides-example.component.html',
    styleUrls: ['./carousel-auto-slides-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        ToolbarComponent,
        ToolbarLabelDirective,
        ToolbarSpacerDirective,
        ToolbarItemDirective,
        ContentDensityDirective,
        CarouselComponent,
        CarouselItemComponent,
        CardModule,
        ListModule
    ]
})
export class CarouselAutoSlidesExampleComponent {
    visible = false;

    openPage(): void {
        this.visible = true;
    }

    closePage(): void {
        this.visible = false;
    }
}
