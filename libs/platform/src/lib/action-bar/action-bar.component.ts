import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-action-bar',
    templateUrl: './action-bar.component.html',
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
     * "back" button label.
     */
    @Input()
    backButtonLabel = 'Go Back';

    /**
     * Emitted event when "back" button is clicked.
     */
    @Output()
    backButtonClick: EventEmitter<void> = new EventEmitter();

    navigationArrow$: Observable<string>;

    constructor(@Optional() private _rtlService: RtlService, _cd: ChangeDetectorRef) {
        super(_cd);
    }

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow')))
            : of('navigation-left-arrow');
    }
}
