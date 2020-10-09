import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { WizardComponent } from './wizard.component';
import { WizardModule } from './wizard.module';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `
        <fd-wizard>
            <fd-wizard-navigation>
                <ul fd-wizard-progress-bar>
                    <li fd-wizard-step status="completed" label="Step 1: One Line">
                        <fd-wizard-step-indicator glyph="accept"></fd-wizard-step-indicator>
                        <fd-wizard-content>
                            Wizard Content for step 1
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
                        </fd-wizard-content>
                    </li>
                    <li
                        fd-wizard-step
                        status="current"
                        style="width: 150px;"
                        label="Step 3: One line truncates"
                        optionalText="(Optional)"
                        #step3
                    >
                        <fd-wizard-step-indicator>3</fd-wizard-step-indicator>
                        <fd-wizard-content>
                            Wizard Content for step 3
                        </fd-wizard-content>
                    </li>
                    <li fd-wizard-step status="upcoming" label="Step 4: Future Step">
                        <fd-wizard-step-indicator>4</fd-wizard-step-indicator>
                        <fd-wizard-content>
                            Wizard Content for step 4
                        </fd-wizard-content>
                    </li>
                </ul>
            </fd-wizard-navigation>
        </fd-wizard>
    `
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [WizardModule]
        })
            .overrideComponent(WizardComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.wizardComponent;
        element = fixture.componentInstance.wizardElement;
        step3 = fixture.componentInstance.step3;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<any> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle resize - screen getting smaller', () => {
        component.resizeHandler();

        expect(component.steps.first.getClassList().contains('fd-wizard__step--no-label')).toBeTruthy();
        expect(component.steps.first.getClassList().contains('fd-wizard__step--stacked')).toBeTruthy();
        expect(
            component.steps.toArray()[1].getClassList().contains('fd-wizard__step--stacked-top')
        ).toBeTruthy();
    });

    it('should handle resize - screen getting bigger', async () => {
        spyOn(element.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        component.resizeHandler();
        element.nativeElement.getBoundingClientRect.and.returnValue({ width: 2 });
        step3.nativeElement.style.width = '200px';
        component.resizeHandler();

        expect(component.steps.first.getClassList().contains('fd-wizard__step--no-label')).toBeFalsy();
        expect(component.steps.first.getClassList().contains('fd-wizard__step--stacked')).toBeFalsy();
        expect(
            component.steps.toArray()[1].getClassList().contains('fd-wizard__step--stacked-top')
        ).toBeFalsy();
    });
});
