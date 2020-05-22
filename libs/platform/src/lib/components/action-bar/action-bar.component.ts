import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../base';
@Component({
    selector: 'fdp-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
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
     * Compact mode
     */
    compact = false;

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

    constructor(private _rtlService: RtlService, _cd: ChangeDetectorRef) {
        super(_cd);
    }

    ngOnInit(): void {

        if (this.contentDensity === 'compact') {
            this.compact = true;
        }
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

}
