import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent, IconSize } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'fd-icon-size-example',
    template: `
        <div class="fd-docs-icon-container">
            @for (size of sizes; track size) {
                <div class="fd-docs-icons">
                    <fd-icon glyph="home" [size]="size"></fd-icon>
                    <span>{{ size }}</span>
                </div>
            }
        </div>
    `,
    styleUrls: ['icon-size-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent]
})
export class IconSizeExampleComponent {
    sizes: IconSize[] = ['sm', 'md', 'lg', 'xl', 'xxl'];
}
