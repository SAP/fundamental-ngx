import {
    AfterViewInit,
    Component,
    ContentChildren,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fd-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WizardComponent implements AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(WizardStepComponent, { descendants: true })
    steps: QueryList<WizardStepComponent>;

    /** @hidden */
    contentTemplate: TemplateRef<any>;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    ngAfterViewInit(): void {
        this._setContentTemplate();
        this._subscriptions.add(
            this.steps.changes.subscribe(() => {
                this._setContentTemplate();
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this.steps.forEach((step) => {
            if (step.status === 'current') {
                this.contentTemplate = step.content.contentTemplate;
            }
        });
    }
}
