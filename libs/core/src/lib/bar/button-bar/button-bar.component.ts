import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import { BaseButton, ButtonType } from '@fundamental-ngx/core/button';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

let randomButtonBarId = 0;
@Component({
  selector: 'fd-button-bar',
  template: `
      <button fd-button
              [id]="id"
              [type]="type"
              [glyphPosition]="glyphPosition"
              [glyph]="glyph"
              [compact]="compact"
              [fdType]="fdType"
              [label]="label"
              [attr.title]="title"
              [ariaLabel]="ariaLabel"
              [fdMenu]="fdMenu"
              [disabled]="disabled"
      >
          <ng-content></ng-content>
      </button>
  `
})
export class ButtonBarComponent extends BaseButton implements OnInit, OnDestroy {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth = false;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Default value is set to 'transparent'
     */
    @Input()
    fdType: ButtonType = 'transparent';

    /** adding title to the button */
    @Input()
    title: string;

    /** Whether or not the button is compact. */
    @Input()
    compact?: boolean;

    /** Aria label attribute value. */
    @Input()
    ariaLabel: string;

    /** the aria-labelledby ids to be associated with this element */
    @Input()
    ariaLabelledby: string;

    /** id for this element */
    @Input()
    id = `fd-button-bar-id-${randomButtonBarId++}`;

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    _barElement = true;

    @HostBinding('style.pointer-events')
    get pointerEvents(): string {
        return this._disabled ? 'none' : 'auto';
    }

    /** @hidden */
    @ViewChild(ButtonComponent)
    _buttonComponent: ButtonComponent;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        @Optional() private _contentDensityService: ContentDensityService,
        private _cdRef: ChangeDetectorRef,
        ) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener.subscribe(density => {
                this.compact = density !== 'cozy';
                this._cdRef.markForCheck();
            }))
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
