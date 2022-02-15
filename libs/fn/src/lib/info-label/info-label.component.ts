import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

export type InfoLabelColor =
    | 'mango'
    | 'red'
    | 'raspberry'
    | 'pink'
    | 'indigo'
    | 'blue'
    | 'teal'
    | 'green'
    | 'cyan'
    | 'grey'
    | 'display';

@Component({
    selector: 'fn-info-label',
    templateUrl: './info-label.component.html',
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelComponent {
    /** Info label text. */
    @Input()
    label!: string;

    /** Info label color. Default is `display` */
    @Input()
    color: InfoLabelColor = 'display';

    /** @hidden User-defined class */
    @Input()
    class: string | undefined;

    /** @hidden */
    @HostBinding('attr.class')
    private get _componentClass(): string {
        return ['fn-info-label', `fn-info-label--${this.color}`, this.class].filter((c) => !!c).join(' ');
    }
}
