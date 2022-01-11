import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ColumnLayout } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-form-custom-layout',
    templateUrl: './platform-form-custom-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PlatformFormCustomLayoutComponent {
    basicExampleLabelColumnLayout: ColumnLayout = {
        XL: 6,
        L: 6,
        M: 6,
        S: 12
    };

    basicExampleFieldColumnLayout: ColumnLayout = {
        XL: 6,
        M: 6,
        S: 12
    };
}
