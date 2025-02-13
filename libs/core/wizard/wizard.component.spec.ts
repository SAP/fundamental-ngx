import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { TabbableElementService } from '@fundamental-ngx/cdk/utils';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardNavigationComponent } from './wizard-navigation/wizard-navigation.component';
import { WizardNextStepComponent } from './wizard-next-step/wizard-next-step.component';
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { WizardStepIndicatorComponent } from './wizard-step-indicator/wizard-step-indicator.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardComponent } from './wizard.component';

@Component({
    template: `
        <fd-dialog-body
            class="fd-scrollbar fd-dialog__body fd-dialog__body--no-vertical-padding"
            style="overflow: auto; padding: 1rem;"
        >
            <fd-wizard>
                <fd-wizard-navigation>
                    <ul fd-wizard-progress-bar>
                        <li fd-wizard-step status="completed" label="Step 1: One Line">
                            <fd-wizard-step-indicator glyph="accept"></fd-wizard-step-indicator>
                            <fd-wizard-content>
                                Wizard Content for step 1
                                <fd-wizard-next-step> <button>Next step 1</button> </fd-wizard-next-step>
                            </fd-wizard-content>
                        </li>
                        <li
                            fd-wizard-step
                            status="completed"
                            label="Step 2: Very long label that truncates on the second line"
                        >
                            <fd-wizard-step-indicator>2</fd-wizard-step-indicator>
                            <fd-wizard-content>
                                Wizard Content for step 2
                                <fd-wizard-next-step> <button>Next step 2</button> </fd-wizard-next-step>
                            </fd-wizard-content>
                        </li>
                        <li
                            fd-wizard-step
                            status="current"
                            [style.width.px]="150"
                            label="Step 3: One line truncates"
                            optionalText="(Optional)"
                            #step3
                        >
                            <fd-wizard-step-indicator>3</fd-wizard-step-indicator>
                            <fd-wizard-content>
                                Wizard Content for step 3
                                <fd-wizard-next-step> <button>Next step 3</button> </fd-wizard-next-step>
                            </fd-wizard-content>
                        </li>
                        <li fd-wizard-step status="upcoming" label="Step 4: Future Step">
                            <fd-wizard-step-indicator>4</fd-wizard-step-indicator>
                            <fd-wizard-content>
                                Wizard Content for step 4
                                <fd-wizard-next-step> <button>Next step 4</button> </fd-wizard-next-step>
                            </fd-wizard-content>
                        </li>
                    </ul>
                </fd-wizard-navigation>
            </fd-wizard>
            <div
                fd-bar=""
                bardesign="floating-footer"
                class="fd-bar fd-bar--floating-footer is-compact"
                ng-reflect-bar-design="floating-footer"
            >
                <div fd-bar-right="" class="fd-bar__right">
                    <fd-button-bar
                        label="Previous Step"
                        ng-reflect-label="Previous Step"
                        class="fd-bar__element ng-star-inserted"
                        style="pointer-events: auto;"
                    >
                        <button
                            fd-button=""
                            class="fd-button fd-button--transparent is-cozy"
                            id="fd-button-bar-id-2"
                            ng-reflect-type="button"
                            ng-reflect-glyph-position="before"
                            ng-reflect-fd-type="transparent"
                            ng-reflect-label="Previous Step"
                            ng-reflect-fd-menu="false"
                            ng-reflect-disabled="false"
                            type="button"
                        >
                            <span class="fd-button__text ng-star-inserted"> Previous Step </span>
                        </button>
                    </fd-button-bar>
                    <fd-button-bar
                        ng-reflect-label="Next Step"
                        ng-reflect-disabled="true"
                        class="fd-bar__element ng-star-inserted"
                        style="pointer-events: none;"
                    >
                        <button
                            fd-button=""
                            class="fd-button fd-button--transparent is-disabled is-cozy"
                            id="fd-button-bar-id-1"
                            ng-reflect-type="button"
                            ng-reflect-glyph-position="before"
                            ng-reflect-fd-type="transparent"
                            ng-reflect-label="Next Step"
                            ng-reflect-fd-menu="false"
                            ng-reflect-disabled="true"
                            type="button"
                            disabled="true"
                        >
                            <span class="fd-button__text ng-star-inserted"> Next Step </span>
                        </button>
                    </fd-button-bar>
                    <fd-button-bar
                        label="Cancel"
                        ng-reflect-label="Cancel"
                        class="fd-bar__element"
                        style="pointer-events: auto;"
                    >
                        <button
                            fd-button=""
                            class="fd-button fd-button--transparent is-cozy"
                            id="fd-button-bar-id-0"
                            ng-reflect-type="button"
                            ng-reflect-glyph-position="before"
                            ng-reflect-fd-type="transparent"
                            ng-reflect-label="Cancel"
                            ng-reflect-fd-menu="false"
                            ng-reflect-disabled="false"
                            type="button"
                        >
                            <span class="fd-button__text ng-star-inserted"> Cancel </span>
                        </button>
                    </fd-button-bar>
                </div>
            </div>
        </fd-dialog-body>
    `,
    standalone: true,
    imports: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardContentComponent,
        WizardNextStepComponent
    ]
})
class TestWrapperComponent {
    @ViewChild(WizardComponent, { static: true })
    wizardComponent: WizardComponent;

    @ViewChild(WizardComponent, { read: ElementRef, static: true })
    wizardElement: ElementRef;

    @ViewChild('step3', { read: ElementRef, static: true })
    step3: ElementRef;
}

describe('WizardComponent', () => {
    let element: ElementRef;
    let step3: ElementRef;
    let component: WizardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestWrapperComponent]
        })
            .overrideComponent(WizardComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        HTMLElement.prototype.scroll = () => {};
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.wizardComponent;
        element = fixture.componentInstance.wizardElement;
        step3 = fixture.componentInstance.step3;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle resize - screen getting smaller', fakeAsync(() => {
        jest.spyOn((component as any)._elRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
            width: 1000
        });
        component.resizeHandler();
        tick(10);

        expect(component.steps.first.getClassList().contains('fd-wizard__step--no-label')).toBeTruthy();
        expect(component.steps.first.getClassList().contains('fd-wizard__step--stacked')).toBeTruthy();
        expect(component.steps.toArray()[1].getClassList().contains('fd-wizard__step--stacked-top')).toBeTruthy();
    }));

    it('should handle resize - screen getting bigger', fakeAsync(() => {
        jest.spyOn((component as any)._elRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
            width: 1000
        });
        jest.spyOn(element.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 });

        component.resizeHandler();
        tick(10);

        jest.spyOn(element.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 2 });
        jest.spyOn(step3.nativeElement, 'clientWidth', 'get').mockReturnValue(200);

        component.resizeHandler();
        tick(10);

        expect(component.steps.first.getClassList().contains('fd-wizard__step--no-label')).toBeFalsy();
        expect(component.steps.first.getClassList().contains('fd-wizard__step--stacked')).toBeFalsy();
        expect(component.steps.toArray()[1].getClassList().contains('fd-wizard__step--stacked-top')).toBeFalsy();
    }));

    it('should setContentTemplates', fakeAsync(() => {
        component.ngAfterViewInit();
        tick(500);

        expect(component.steps.first._stepId).toBe(0);
        expect(component.steps.last._stepId).toBe(3);
        expect(component.steps.first.content.wizardContentId).toBe('0');
        expect(component.steps.first.visited).toBeTruthy();
        expect(component.steps.last._finalStep).toBeTruthy();
    }));

    it('should handleStepOrStatusChanges', fakeAsync(() => {
        component.wrapperContainer.nativeElement.children[0].scrollTo = () => {};
        component.appendToWizard = true;
        jest.spyOn(component.scrollbar, 'scroll');

        component.ngAfterViewInit();
        tick(500);

        const contentContainer = (component as any)._elRef.nativeElement.querySelectorAll('.fd-wizard__content')[2];
        expect(contentContainer).toBeTruthy();
        const tabbableEl = contentContainer?.querySelector('button, input, select, [tabindex]') as HTMLElement;
        const viewServiceSpy = jest
            .spyOn(TestBed.inject(TabbableElementService), 'getTabbableElement')
            .mockReturnValue(tabbableEl);

        component.ngAfterViewInit();
        tick(500);

        component.steps.first.statusChange.emit();
        tick(500);

        expect(viewServiceSpy).toHaveBeenCalledWith(contentContainer);
        expect(tabbableEl).toBeTruthy();
        expect(document.activeElement).toBe(tabbableEl);
    }));

    it('should handleScrollSpyChange', fakeAsync(() => {
        jest.spyOn(step3.nativeElement.children[0], 'id', 'get').mockReturnValue('2');

        component.ngAfterViewInit();
        tick(500);

        component.scrollSpyChange(step3.nativeElement);
        tick(10);

        expect(component.steps.first.status).toBe('completed');
        expect(component.steps.last.status).toBe('upcoming');
    }));
});
