import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';

@Component({
    selector: 'fn-list, [fn-list]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class]': `'fn-list ' + (class || '')`,
        '[class.fn-list--byline]': 'byline'
    }
})
export class ListComponent {
    @Input()
    class!: string;

    @Input()
    @coerceBoolean
    byline!: BooleanInput;
}
