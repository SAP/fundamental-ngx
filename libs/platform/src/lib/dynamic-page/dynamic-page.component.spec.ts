import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { TabPanelComponent, TabsModule } from '@fundamental-ngx/core/tabs';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { DynamicPageService } from './dynamic-page.service';
import { PlatformDynamicPageModule } from './dynamic-page.module';
import { CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title>
                <fdp-dynamic-page-global-actions>
                    <fd-toolbar fdType="transparent" [clearBorder]="true">
                        <button
                            fd-toolbar-item
                            fd-button
                            fdCompact
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
                        <button fd-button fdType="transparent" aria-label="Resize">
                            <i class="sap-icon--resize"></i>
                        </button>
                    </fd-toolbar>
                </fdp-dynamic-page-layout-actions>
            </fdp-dynamic-page-title>
            <fdp-dynamic-page-header></fdp-dynamic-page-header>
            <fdp-dynamic-page-content>DynamicPage Content Text</fdp-dynamic-page-content>
        </fdp-dynamic-page>
    `
})
class TestComponent {
    size: DynamicPageResponsiveSize = 'medium';
    background: DynamicPageBackgroundType = 'solid';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageHeaderComponent) dynamicPageHeaderComponent: DynamicPageHeaderComponent;
    @ViewChild(DynamicPageContentComponent) dynamicPageContentComponent: DynamicPageContentComponent;
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageServiceSpy: jasmine.SpyObj<DynamicPageService>;

    beforeEach(
        waitForAsync(() => {
            dynamicPageServiceSpy = jasmine.createSpyObj('DynamicPageService', ['expandHeader', 'collapseHeader']);

            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, ToolbarModule, ButtonModule],
                declarations: [TestComponent],
                providers: [{ provide: DynamicPageService, useValue: dynamicPageServiceSpy }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', async () => {
        fixture.detectChanges();
        const headerElement = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPage));
        expect(headerElement).toBeTruthy();
    });

    it('should set proper style by size', async () => {
        const dynamicPageElement = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPage)).nativeElement;
        component.dynamicPage.size = 'large';
        fixture.detectChanges();
        expect(dynamicPageElement.classList.contains('fd-dynamic-page--lg')).toBeTruthy();

        component.dynamicPage.size = 'small';
        fixture.detectChanges();
        expect(dynamicPageElement.classList.contains('fd-dynamic-page--sm')).toBeTruthy();
    });

    it('should set background styles', async () => {
        const dynamicPageElement = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPage)).nativeElement;
        component.dynamicPage.background = 'transparent';
        fixture.detectChanges();
        expect(dynamicPageElement.classList.contains('fd-dynamic-page--transparent-bg')).toBeTruthy();

        component.dynamicPage.background = 'list';
        fixture.detectChanges();
        expect(dynamicPageElement.classList.contains('fd-dynamic-page--list-bg')).toBeTruthy();
    });

    it('should render content in view', () => {
        fixture.detectChanges();
        const contentEl = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPageContent)).nativeElement;
        expect(contentEl.innerText).toBe('DynamicPage Content Text');
    });

    it('should collapse header on click of title', async () => {
        component.dynamicPageHeaderComponent._onCollapseChange(true);
        fixture.detectChanges();
        const contentEl: HTMLElement = fixture.debugElement.query(
            By.css('.fd-dynamic-page__collapsible-header')
        ).nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
    });

    it('should collapse header on scroll', fakeAsync(() => {
        component.dynamicPage.ngAfterViewInit();
        const throttleTime = 100;
        const contentEl = fixture.debugElement.query(By.css('fd-dynamic-page-content'));

        const emitSpy = spyOn(component.dynamicPageHeaderComponent.collapsedChange, 'emit');

        contentEl.nativeElement.dispatchEvent(new Event('scroll'));

        fixture.detectChanges();
        tick(throttleTime);

        fixture.whenStable().then(() => {
            expect(emitSpy).toHaveBeenCalled();
        });
    }));
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title></fdp-dynamic-page-title>
            <fdp-dynamic-page-header></fdp-dynamic-page-header>
            <fdp-dynamic-page-content id="tab1" [tabLabel]="tabLabel1">
                DynamicPage Content Tabbed 1 Text
            </fdp-dynamic-page-content>
            <fdp-dynamic-page-content id="tab2" [tabLabel]="tabLabel2">
                DynamicPage Content Tabbed 2 Text
            </fdp-dynamic-page-content>
        </fdp-dynamic-page>
    `
})
class TestTabbedComponent {
    size: DynamicPageResponsiveSize = 'medium';
    background: DynamicPageBackgroundType = 'solid';
    tabLabel1 = 'Tab 1';
    tabLabel2 = 'Tab 2';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent tabbed values', () => {
    let component: TestTabbedComponent;
    let fixture: ComponentFixture<TestTabbedComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, TabsModule],
                declarations: [TestTabbedComponent],
                providers: [{ provide: DynamicPageService }]
            }).compileComponents();
        })
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabbedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should render proper components', async () => {
        fixture.detectChanges();
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs__content'));
        const tabEl = fixture.debugElement.query(By.directive(TabPanelComponent));
        expect(tabsContainer).toBeTruthy();
        expect(tabEl).toBeTruthy();
    });

    it('should set default tab size', async () => {
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs'));
        fixture.detectChanges();
        expect(tabsContainer.nativeElement.classList.contains('fd-tabs--m')).toBeTruthy();
    });

    it('should switch tabs', async () => {
        dynamicPageComponent.setSelectedTab('tab2');
        fixture.detectChanges();
        const tab2: HTMLElement = fixture.debugElement.query(By.css('#tab2')).nativeElement;
        expect(tab2.getAttribute('id')).toBe('tab2');
    });
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title></fdp-dynamic-page-title>
            <fdp-dynamic-page-header [collapsible]="false" [pinnable]="false"></fdp-dynamic-page-header>
            <fdp-dynamic-page-content>DynamicPage Content</fdp-dynamic-page-content>
        </fdp-dynamic-page>
    `
})
class TestNonCollapsibleComponent {
    size: DynamicPageResponsiveSize = 'medium';
    background: DynamicPageBackgroundType = 'solid';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent with collapsible set to false', () => {
    let fixture: ComponentFixture<TestNonCollapsibleComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, TabsModule],
                declarations: [TestNonCollapsibleComponent],
                providers: [{ provide: DynamicPageService }]
            }).compileComponents();
        })
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(TestNonCollapsibleComponent);
        fixture.detectChanges();
    });

    it('should not show the collapse button', () => {
        const collapseButton = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapse-button'));
        expect(collapseButton.length).toBe(0);
    });

    it('should not show the pin button', () => {
        const collapseButton = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__pin-button'));
        expect(collapseButton.length).toBe(0);
    });

    it('should not collapse the header on click of title area', () => {
        const dynamicPageTitle = fixture.debugElement.query(By.css('.fd-dynamic-page__title-container'));
        dynamicPageTitle.nativeElement.click();
        fixture.detectChanges();

        const contentEl: HTMLElement = fixture.debugElement.query(
            By.css('.fd-dynamic-page__collapsible-header')
        ).nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).not.toBe('true');
    });
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-title>
                    <fdp-dynamic-page-global-actions>
                        <fd-toolbar fdType="transparent" [clearBorder]="true">
                            <button
                                fd-toolbar-item
                                fd-button
                                fdCompact
                                fdType="positive"
                                (click)="$event.stopPropagation()"
                                id="global-action-button"
                            >
                                Accept
                            </button>
                        </fd-toolbar>
                    </fdp-dynamic-page-global-actions>
                    <fdp-dynamic-page-layout-actions>
                        <!-- layout actions -->
                        <fd-toolbar fdType="transparent" [clearBorder]="true">
                            <button fd-button fdType="transparent" aria-label="Resize" id="layout-action-button">
                                <i class="sap-icon--resize"></i>
                            </button>
                        </fd-toolbar>
                    </fdp-dynamic-page-layout-actions>
                </fdp-dynamic-page-title>
            </ng-container>
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-header>
                    <div id="test-header">Header</div>
                </fdp-dynamic-page-header>
            </ng-container>
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-content>
                    <div id="test-content">DynamicPage Content Text</div>
                </fdp-dynamic-page-content>
            </ng-container>

            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-footer>
                    <div id="test-footer">DynamicPage Footer</div>
                </fdp-dynamic-page-footer>
            </ng-container>
        </fdp-dynamic-page>
    `
})
class HostTestComponent {
    size: DynamicPageResponsiveSize = 'medium';
    background: DynamicPageBackgroundType = 'solid';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent Content Projection', () => {
    let fixture: ComponentFixture<HostTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, ToolbarModule, ButtonModule],
                declarations: [HostTestComponent],
                providers: [DynamicPageService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HostTestComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should project title with toolbars content', () => {
        expect(fixture.debugElement.query(By.css('#global-action-button'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#layout-action-button'))).toBeTruthy();
    });

    it('should project header content', () => {
        expect(fixture.debugElement.query(By.css('#test-header'))).toBeTruthy();
    });

    it('should project main content', () => {
        expect(fixture.debugElement.query(By.css('#test-content'))).toBeTruthy();
    });

    it('should project footer content', () => {
        expect(fixture.debugElement.query(By.css('#test-footer'))).toBeTruthy();
    });
});
