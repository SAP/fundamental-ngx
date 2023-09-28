import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncPipe, NgIf } from '@angular/common';
import { RtlService, warnOnce } from '@fundamental-ngx/cdk/utils';
import {
    ActionBarBackDirective,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarTitleComponent,
    ActionBarComponent as CoreActionBarComponent
} from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
/**
 * @deprecated
 * Action Bar component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-action-bar',
    templateUrl: './action-bar.component.html',
    standalone: true,
    imports: [
        CoreActionBarComponent,
        ActionBarHeaderDirective,
        NgIf,
        ActionBarBackDirective,
        ButtonComponent,
        ActionBarTitleComponent,
        ActionBarDescriptionDirective,
        AsyncPipe,
        FdTranslatePipe
    ]
})
export class ActionBarComponent extends BaseComponent implements OnInit {
    /**
     * Actionbar title
     */
    @Input()
    title: string;

    /**
     * Actionbar description
     */
    @Input()
    description: string;

    /**
     * Show "back" button.
     */
    @Input()
    showBackButton = false;

    /**
     * Emitted event when "back" button is clicked.
     */
    @Output()
    backButtonClick: EventEmitter<void> = new EventEmitter();

    /** @hidden */
    navigationArrow$: Observable<string>;

    /** @hidden */
    constructor(@Optional() private _rtlService: RtlService, _cd: ChangeDetectorRef) {
        super(_cd);
        warnOnce(
            'ActionBarComponent is deprecated since version 0.40.0 and will be removed in next release. Use [fd-action-bar] from @fundamental-ngx/core instead.'
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow')))
            : of('navigation-left-arrow');
    }
}
