import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

export type SkeletonType = 'circle' | 'rectangle';

@Component({
    selector: 'fd-skeleton',
    template: `<ng-content></ng-content>`,
    styleUrls: ['skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent implements OnChanges {
    /** Width of the skeleton. */
    @Input()
    width: string;

    /** Height of the skeleton. */
    @Input()
    height: string;

    /** Type of the skeleton. */
    @Input()
    type: SkeletonType = 'rectangle';

    /** Whether the skeleton has animation. */
    @Input()
    @HostBinding('class.fd-skeleton--animated')
    animation = true;

    /** @hidden */
    @HostBinding('style.width')
    _width: string;

    /** @hidden */
    @HostBinding('style.height')
    _height: string;

    /** @hidden */
    @HostBinding('class.fd-skeleton--circle')
    get _circleClass(): boolean {
        return this.type === 'circle';
    }

    /** @hidden */
    @HostBinding('class')
    readonly _class = 'fd-skeleton fd-skeleton--component';

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['height']) {
            this._height = this.height;
        }

        if (changes['width']) {
            this._width = this.width;
        }
    }
}
