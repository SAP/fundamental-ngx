import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PanelActionsComponent } from './panel-actions.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelComponent, PanelExpandChangeEvent } from './panel.component';
import { PlatformPanelModule } from './panel.module';

@Component({
    template: ` <fdp-panel title="Panel Title">
        <fdp-panel-content>Panel Content Text</fdp-panel-content>
    </fdp-panel>`,
    standalone: true,
    imports: [PlatformPanelModule]
})
class PanelWithDefaultValuesComponent {
    @ViewChild(PanelComponent) panel: PanelComponent;
    @ViewChild(PanelComponent, { read: ElementRef }) panelElm: ElementRef<HTMLElement>;
}

describe('PanelComponent default values', () => {
    let component: PanelWithDefaultValuesComponent;
    let fixture: ComponentFixture<PanelWithDefaultValuesComponent>;
    let panelComponent: PanelComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PanelWithDefaultValuesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelWithDefaultValuesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        panelComponent = component.panel;
    });

    it('Should be expandable by default', () => {
        expect(panelComponent.expandable).toBeTruthy();
    });

    it('Should be expanded by default', () => {
        expect(panelComponent.expanded).toBeTruthy();
    });

    it('Should have default value of collapseLabel as "Collapse Panel"', () => {
        expect(panelComponent.collapseLabel).toBe('Collapse Panel');
    });

    it('Should have default value of expandLabel as "Expand Panel"', () => {
        expect(panelComponent.expandLabel).toBe('Expand Panel');
    });
});

@Component({
    template: ` <fdp-panel
        id="panel-id"
        [title]="title"
        [fdContentDensity]="contentDensity"
        [expanded]="expanded"
        [expandable]="expandable"
        [expandLabel]="expandLabel"
        [collapseLabel]="collapseLabel"
        (panelExpandChange)="onExpandChange($event)"
    >
        <fdp-panel-actions>
            <fdp-button label="Apply"></fdp-button>
        </fdp-panel-actions>

        <fdp-panel-content [contentHeight]="contentHeight">Panel Content Text</fdp-panel-content>
    </fdp-panel>`,
    standalone: true,
    imports: [PlatformPanelModule, PlatformButtonModule]
})
class SimplePanelComponent {
    @ViewChild(PanelComponent) panel: PanelComponent;
    @ViewChild(PanelComponent, { read: ElementRef }) panelElm: ElementRef<HTMLElement>;
    @ViewChild(PanelContentComponent) panelContent: PanelContentComponent;
    @ViewChild(PanelActionsComponent) panelActions: PanelActionsComponent;

    expanded = true;
    expandable = true;
    title = 'Panel Title';
    contentHeight: string;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    expandLabel = 'Collapse Panel';
    collapseLabel = 'Expand Panel';

    onExpandChange(event: PanelExpandChangeEvent): void {
        this.expanded = event.payload;
    }
}

describe('Simple PanelComponent', () => {
    let component: SimplePanelComponent;
    let fixture: ComponentFixture<SimplePanelComponent>;
    let panelContentComponent: PanelContentComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SimplePanelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimplePanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        panelContentComponent = component.panelContent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should be able to set title with title property', async () => {
        const panelTitle = 'Test Panel Title';
        component.title = panelTitle;
        fixture.detectChanges();
        const panelTitleEl: HTMLElement = fixture.debugElement.query(By.css('.fd-panel__title')).nativeElement;
        expect(panelTitleEl.textContent).toBe(panelTitle);
    });

    it('Should be able to change the contentDensity to "compact"', async () => {
        component.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        expect(component.panelElm.nativeElement.classList).toContain('is-compact');
    });

    it('Should be able to fix the height of the Panel body via the contentHeight property', async () => {
        expect(panelContentComponent.contentHeight).toBeFalsy();
        component.contentHeight = '320px';
        fixture.detectChanges();
        expect(panelContentComponent.contentHeight).toBe('320px');
    });

    it('Should not be able to see expand/collapse button if expandable is "false"', async () => {
        let toggleButton = fixture.debugElement.queryAll(By.css('.fd-panel__button'));
        expect(toggleButton.length).toBe(1);
        component.expandable = false;
        fixture.detectChanges();
        toggleButton = fixture.debugElement.queryAll(By.css('.fd-panel__button'));
        expect(toggleButton.length).toBe(0);
    });

    it('Should be able to collapse Panel by setting expanded to "false"', async () => {
        component.expanded = false;
        fixture.detectChanges();
        const contentEl = fixture.debugElement.queryAll(By.css('.fd-panel__content'));
        expect(contentEl.length).toBe(0);
    });

    it('Should be able to expand Panel by setting expanded to "true"', async () => {
        component.expanded = true;
        fixture.detectChanges();
        const contentEl = fixture.debugElement.queryAll(By.css('.fd-panel__content'));
        expect(contentEl.length).toBe(1);
    });

    it('Should set the aria-label of the expand/collapse button to the value of expandLabel if the Panel is collapsed', async () => {
        component.expanded = false;
        component.expandLabel = 'slim arrow right,transparent';
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.expandLabel);
    });

    it('Should set the aria-label of the expand/collapse button to the value of collapseLabel if the Panel is expanded', async () => {
        component.expanded = true;
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.collapseLabel);
    });

    it('Should set the aria-label of the expand/collapse button to the value of collapseLabel if the Panel is expanded', async () => {
        component.expanded = true;
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.collapseLabel);
    });

    it('Should emit a panelExpandChange event when the Panel is expanded and collapsed', async () => {
        let changeEvent: PanelExpandChangeEvent | undefined;
        const onExpandChangeSpy = jest
            .spyOn(component, 'onExpandChange')
            .mockImplementation((event: PanelExpandChangeEvent) => {
                changeEvent = event;
            });
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;

        toggleButton.click();
        fixture.detectChanges();
        expect(changeEvent).toBeDefined();
        expect(onExpandChangeSpy).toHaveBeenCalledTimes(1); // Use toHaveBeenCalledTimes

        toggleButton.click();
        fixture.detectChanges();
        expect(onExpandChangeSpy).toHaveBeenCalledTimes(2); // Use toHaveBeenCalledTimes
        expect(changeEvent!.payload).toBe(true);

        expect(changeEvent instanceof PanelExpandChangeEvent).toBe(true);
    });
});
