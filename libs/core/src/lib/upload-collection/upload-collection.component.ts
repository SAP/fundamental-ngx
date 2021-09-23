import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-upload-collection',
    host: { class: 'fd-upload-collection' },
    styleUrls: ['./upload-collection.component.scss'],
    template: `<ul fd-list [byline]="true" [selection]="selection">
        <ng-content></ng-content>
    </ul>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
