import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { whenStable } from '@fundamental-ngx/core/tests';
import { SettingsContainerComponent } from './settings-container.component';

@Component({
    template: `
        <fd-settings-container>
            <div fd-settings-list-area>
                <p>List Area</p>
            </div>
        </fd-settings-container>

        <ng-template #testTemplate1>
            <div class="test-template-1">Template 1 Content</div>
        </ng-template>

        <ng-template #testTemplate2>
            <div class="test-template-2">Template 2 Content</div>
        </ng-template>
    `,
    imports: [SettingsContainerComponent]
})
class SettingsContainerTestComponent {
    readonly settingsContainer = viewChild(SettingsContainerComponent);
    readonly testTemplate1 = viewChild<TemplateRef<any>>('testTemplate1');
    readonly testTemplate2 = viewChild<TemplateRef<any>>('testTemplate2');
}

describe('SettingsContainerComponent', () => {
    let component: SettingsContainerComponent;
    let fixture: ComponentFixture<SettingsContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SettingsContainerComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement.classList.contains('fd-settings__container')).toBe(true);
    });
});

describe('SettingsContainerComponent - Secondary View Navigation', () => {
    let testFixture: ComponentFixture<SettingsContainerTestComponent>;
    let testComponent: SettingsContainerTestComponent;
    let settingsContainer: SettingsContainerComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SettingsContainerTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        testFixture = TestBed.createComponent(SettingsContainerTestComponent);
        testComponent = testFixture.componentInstance;
        testFixture.detectChanges();
        settingsContainer = testComponent.settingsContainer()!;
    });

    it('should not have stacked view initially', () => {
        expect(settingsContainer.hasStackedView()).toBe(false);
    });

    it('should push a view onto the stack', () => {
        const template = testComponent.testTemplate1()!;
        settingsContainer.pushView(template, 'Test View 1');
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(true);
        expect(settingsContainer.currentTitle()).toBe('Test View 1');
    });

    it('should render the pushed view template', async () => {
        const template = testComponent.testTemplate1()!;
        settingsContainer.pushView(template, 'Test View 1');
        testFixture.detectChanges();
        await whenStable(testFixture);

        const renderedContent = testFixture.nativeElement.querySelector('.test-template-1');
        expect(renderedContent).toBeTruthy();
        expect(renderedContent?.textContent).toContain('Template 1 Content');
    });

    it('should stack multiple views', () => {
        const template1 = testComponent.testTemplate1()!;
        const template2 = testComponent.testTemplate2()!;

        settingsContainer.pushView(template1, 'Test View 1');
        testFixture.detectChanges();
        expect(settingsContainer.currentTitle()).toBe('Test View 1');

        settingsContainer.pushView(template2, 'Test View 2');
        testFixture.detectChanges();
        expect(settingsContainer.currentTitle()).toBe('Test View 2');
        expect(settingsContainer.hasStackedView()).toBe(true);
    });

    it('should pop a view from the stack', async () => {
        const template1 = testComponent.testTemplate1()!;
        const template2 = testComponent.testTemplate2()!;

        settingsContainer.pushView(template1, 'Test View 1');
        settingsContainer.pushView(template2, 'Test View 2');
        testFixture.detectChanges();

        settingsContainer.popView();
        testFixture.detectChanges();
        await whenStable(testFixture);

        expect(settingsContainer.currentTitle()).toBe('Test View 1');
        expect(settingsContainer.hasStackedView()).toBe(true);

        const renderedContent = testFixture.nativeElement.querySelector('.test-template-1');
        expect(renderedContent).toBeTruthy();
    });

    it('should clear all stacked views', () => {
        const template1 = testComponent.testTemplate1()!;
        const template2 = testComponent.testTemplate2()!;

        settingsContainer.pushView(template1, 'Test View 1');
        settingsContainer.pushView(template2, 'Test View 2');
        testFixture.detectChanges();

        settingsContainer.clearViewStack();
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(false);
    });

    it('should do nothing when popping an empty stack', () => {
        expect(settingsContainer.hasStackedView()).toBe(false);

        settingsContainer.popView();
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(false);
    });

    it('should handle back button click when view is stacked', () => {
        const template = testComponent.testTemplate1()!;
        settingsContainer.pushView(template, 'Test View 1');
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(true);

        settingsContainer.onHeaderBackClick();
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(false);
    });

    it('should show back button when view is stacked', () => {
        const template = testComponent.testTemplate1()!;
        settingsContainer.pushView(template, 'Test View 1');
        testFixture.detectChanges();

        expect(settingsContainer.hasStackedView()).toBe(true);
    });
});
