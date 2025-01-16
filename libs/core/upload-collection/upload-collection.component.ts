import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ListComponent } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-upload-collection',
    host: { class: 'fd-upload-collection' },
    styleUrl: './upload-collection.component.scss',
    template: `<ul fd-list [byline]="true" [selection]="selection">
        <ng-content></ng-content>
    </ul>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ListComponent]
})
export class UploadCollectionComponent {
    /** Whether or not this is the small upload collection. */
    @Input()
    @HostBinding('class.fd-upload-collection--sm')
    small = false;

    /** Whether or not this upload collection supports selection. */
    @Input()
    selection = false;
}
