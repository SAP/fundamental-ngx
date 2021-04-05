import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlatformButtonModule, ContentDensity } from '@fundamental-ngx/platform';

import { PanelComponent, PanelExpandChangeEvent } from './panel.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelActionsComponent } from './panel-actions/panel-actions.component';
import { PlatformPanelModule } from './panel.module';

@Component({
    template: `<fdp-panel title="Panel Title">
        <fdp-panel-content>Panel Content Text</fdp-panel-content>
    </fdp-panel>`
})
class PanelWithDefaultValuesComponent {
    @ViewChild(PanelComponent) panel: PanelComponent;
}
describe('PanelComponent default values', () => {
    let component: PanelWithDefaultValuesComponent;
    let fixture: ComponentFixture<PanelWithDefaultValuesComponent>;
    let panelComponent: PanelComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformPanelModule],
            declarations: [PanelWithDefaultValuesComponent]
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
    template: `<fdp-panel
        id="panel-id"
        [title]="title"
        [contentDensity]="contentDensity"
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
    </fdp-panel>`
})
class SimplePanelComponent {
    @ViewChild(PanelComponent) panel: PanelComponent;
    @ViewChild(PanelContentComponent) panelContent: PanelContentComponent;
    @ViewChild(PanelActionsComponent) panelActions: PanelActionsComponent;

    expanded = true;
    expandable = true;
    title = 'Panel Title';
    contentHeight: string;
    contentDensity: ContentDensity = 'cozy';
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
            imports: [CommonModule, PlatformPanelModule, PlatformButtonModule],
            declarations: [SimplePanelComponent]
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
        component.contentDensity = 'compact';
        fixture.detectChanges();
        const compactPanel = fixture.debugElement.queryAll(By.css('.fd-panel--compact'));
        expect(compactPanel.length).toBeGreaterThan(0);
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
        component.expandLabel = 'Collapse Panel';
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.expandLabel);
    });

    it('Should set the aria-label of the expand/collapse button to the value of collapseLabel if the Panel is expanded', async () => {
        component.expanded = true;
        component.collapseLabel = 'Expand Panel';
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.collapseLabel);
    });

    it('Should set the aria-label of the expand/collapse button to the value of collapseLabel if the Panel is expanded', async () => {
        component.expanded = true;
        component.collapseLabel = 'Expand Panel';
        fixture.detectChanges();
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;
        expect(toggleButton.getAttribute('aria-label')).toBe(component.collapseLabel);
    });

    it('Should emit a panelExpandChange event when the Panel is expanded and collapsed', async () => {
        let changeEvent: PanelExpandChangeEvent;
        const onExpandChangeSpy = spyOn(component, 'onExpandChange').and.callFake((event: PanelExpandChangeEvent) => {
            changeEvent = event;
        });
        const toggleButton: HTMLButtonElement = fixture.debugElement.query(By.css('.fd-panel__button')).nativeElement;

        toggleButton.click();
        fixture.detectChanges();
        expect(onExpandChangeSpy.calls.count()).toEqual(1);
        expect(changeEvent.payload).toBeFalse();

        toggleButton.click();
        fixture.detectChanges();
        expect(onExpandChangeSpy.calls.count()).toEqual(2);
        expect(changeEvent.payload).toBeTrue();

        expect(changeEvent instanceof PanelExpandChangeEvent).toBeTrue();
    });
});
