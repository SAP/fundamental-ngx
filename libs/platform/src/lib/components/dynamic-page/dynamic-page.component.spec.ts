import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TabsModule, ToolbarModule } from '@fundamental-ngx/core';
import {
    CLASS_NAME,
    DynamicPageComponent,
    DynamicPageService,
    PlatformDynamicPageModule
} from '@fundamental-ngx/platform';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';

@Component({
    template: `<fdp-dynamic-page [size]="size" [background]="background">
        <fdp-dynamic-page-title>
            <fdp-dynamic-page-global-actions>
                <fd-toolbar fdType="transparent" [clearBorder]="true">
                    <button
                        fd-toolbar-item
                        fd-button
                        [compact]="true"
                        fdType="positive"
                        (click)="$event.stopPropagation()"
                    >
                        Accept
                    </button>
                </fd-toolbar>
            </fdp-dynamic-page-global-actions>
            <fdp-dynamic-page-layout-actions>
                <!-- layout actions -->
                <fd-toolbar fdType="transparent" [clearBorder]="true">
                    <button fd-button fdType="transparent" aria-label="Resize" (click)="closePage($event)">
                        <i class="sap-icon--resize"></i>
                    </button>
                </fd-toolbar>
            </fdp-dynamic-page-layout-actions>
        </fdp-dynamic-page-title>
        <fdp-dynamic-page-header></fdp-dynamic-page-header>
        <fdp-dynamic-page-content>DynamicPage Content Text</fdp-dynamic-page-content>
    </fdp-dynamic-page>`
})
class TestComponent {
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageHeaderComponent) dynamicPageHeaderComponent: DynamicPageHeaderComponent;
    @ViewChild(DynamicPageContentComponent) dynamicPageContentComponent: DynamicPageContentComponent;
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;
    let dynamicPageTitleComponent: DynamicPageTitleComponent;
    let dynamicPageContentComponent: DynamicPageContentComponent;

    beforeEach(async(() => {
        const scrollableSpy = jasmine.createSpyObj('DynamicPageService', ['expandHeader', 'collapseHeader']);
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformDynamicPageModule, ToolbarModule, ScrollingModule],
            declarations: [TestComponent],
            providers: [{ provide: DynamicPageService, useValue: scrollableSpy }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', async () => {
        fixture.detectChanges();
        const headerElement = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPage));
        expect(headerElement).toBeTruthy();
    });

    it('should add correct classes to title', async () => {
        dynamicPageTitleComponent = component.dynamicPageTitleComponent;
        fixture.detectChanges();
        expect(
            dynamicPageTitleComponent.elementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPageTitleArea)
        ).toBeTruthy();
    });
    it('should add correct classes to header', async () => {
        fixture.detectChanges();
        const headerElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'));
        expect(headerElement).toBeTruthy();
    });

    it('should add correct classes to toolbar', async () => {
        fixture.detectChanges();
        const toolbarContainer = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPageActionsContainer));
        expect(toolbarContainer).toBeTruthy();
        expect(
            toolbarContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageActionsContainerMedium)
        ).toBeTruthy();

        const globalActionsContainer: HTMLElement = fixture.debugElement.query(
            By.css('.' + CLASS_NAME.dynamicPageGlobalActions)
        ).nativeElement;
        expect(
            globalActionsContainer.classList.contains(CLASS_NAME.dynamicPageGlobalActionsToolbarMedium)
        ).toBeTruthy();

        const layoutActionsContainer = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPageLayoutActions))
            .nativeElement;
        expect(
            layoutActionsContainer.classList.contains(CLASS_NAME.dynamicPageLayoutActionsToolbarMedium)
        ).toBeTruthy();
    });

    it('should add correct classes to content', async () => {
        dynamicPageContentComponent = component.dynamicPageContentComponent;
        fixture.detectChanges();
        expect(
            dynamicPageContentComponent.getElementRef().nativeElement.classList.contains(CLASS_NAME.dynamicPageContent)
        ).toBeTruthy();
    });

    it('should set size to children', async () => {
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('medium');
        component.dynamicPage.size = 'large';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('large');
        component.dynamicPage.size = 'small';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.size).toBe('small');
    });
    it('should set background styles', async () => {
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe(undefined);
        component.dynamicPage.background = 'solid';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('solid');
        component.dynamicPage.background = 'transparent';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('transparent');
        component.dynamicPage.background = 'list';
        component.dynamicPage.ngAfterContentInit();
        fixture.detectChanges();
        expect(component.dynamicPageTitleComponent.background).toBe('list');
    });

    it('should render content in view', () => {
        fixture.detectChanges();
        expect(component.dynamicPageContentComponent.getElementRef().nativeElement.innerText).toBe(
            'DynamicPage Content Text'
        );
    });

    it('should collapse header on click of title', async () => {
        dynamicPageTitleComponent = component.dynamicPageTitleComponent;
        dynamicPageComponent.toggleCollapse();
        component.dynamicPage.ngAfterViewInit();
        fixture.detectChanges();
        const contentEl: HTMLElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'))
            .nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
    });

    it('should collapse header on scroll', fakeAsync(() => {
        component.dynamicPage.ngAfterViewInit();
        const throttleTime = 100;
        document.dispatchEvent(new Event('scroll'));
        spyOn(component.dynamicPageHeaderComponent, 'collapseHeader');
        fixture.detectChanges();
        tick(throttleTime);
        fixture.whenStable().then(() => {
            expect(component.dynamicPageHeaderComponent.collapseHeader).toHaveBeenCalled();
        });
    }));
});

@Component({
    template: `<fdp-dynamic-page [size]="size" [background]="background">
        <fdp-dynamic-page-title></fdp-dynamic-page-title>
        <fdp-dynamic-page-header></fdp-dynamic-page-header>
        <fdp-dynamic-page-content [tabLabel]="tabLabel1">DynamicPage Content Tabbed 1 Text</fdp-dynamic-page-content>
        <fdp-dynamic-page-content [tabLabel]="tabLabel2">DynamicPage Content Tabbed 2 Text</fdp-dynamic-page-content>
    </fdp-dynamic-page>`
})
class TestTabbedComponent {
    size = 'medium';
    background = '';
    tabLabel1 = 'Tab 1';
    tabLabel2 = 'Tab 2';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent tabbed values', () => {
    let component: TestTabbedComponent;
    let fixture: ComponentFixture<TestTabbedComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformDynamicPageModule, TabsModule, ScrollingModule],
            declarations: [TestTabbedComponent],
            providers: [{ provide: DynamicPageService }]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabbedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to tab content', async () => {
        fixture.detectChanges();
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs'));
        expect(tabsContainer).toBeTruthy();
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabs)).toBeTruthy();
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabsAddShadow)).toBeTruthy();
    });

    it('should set default tab size', async () => {
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs'));
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabsMedium)).toBeTruthy();
    });
});
