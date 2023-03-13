import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

let layoutPanelUniqueId = 0;

/**
 * Layout Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
@Component({
    selector: 'fd-layout-panel',
    templateUrl: './layout-panel.component.html',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./layout-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelComponent implements OnChanges, OnInit {
    /** @Input Background image of the panel. */
    @Input()
    backgroundImage: string;

    /** Id for the layout panel element. */
    @Input()
    id: string = 'fd-layout-panel-' + layoutPanelUniqueId++;

    /** @hidden */
    @HostBinding('class.fd-layout-panel')
    fdLayoutPanelClass = true;

    /** Whether the background of the panel should be transparent. */
    @Input()
    @HostBinding('class.fd-layout-panel--transparent')
    transparent = false;

    /** @hidden */
    constructor(private elRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this._applyBackgroundImage();
    }

    /** @hidden */
    ngOnInit(): void {
        this._applyBackgroundImage();
    }

    /** @hidden */
    private _applyBackgroundImage(): void {
        if (this.backgroundImage) {
            (this.elRef.nativeElement as HTMLElement).style['background-image'] = 'url("' + this.backgroundImage + '")';
        }
    }
}
