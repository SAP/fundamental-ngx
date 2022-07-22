import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { InfoLabelColor } from '@fundamental-ngx/fn/info-label';

@Component({
    selector: 'fn-info-label-default-example',
    templateUrl: './info-label-default-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelDefaultExampleComponent {
    colors: InfoLabelColor[] = [
        'mango',
        'red',
        'raspberry',
        'pink',
        'indigo',
        'blue',
        'teal',
        'green',
        'cyan',
        'grey',
        'display'
    ];
}
