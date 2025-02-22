import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsContainerComponent } from '@fundamental-ngx/core/settings';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SettingsHeaderButtonDirective } from '@fundamental-ngx/core/settings';

@Component({
    template: `
        <fd-settings-container #componentElement>
            <div fd-settings-list-area>
                <div fd-settings-list-container>
                    <ul fd-list settingsList>
                        <li fd-list-item #listItem></li>
                    </ul>
                </div>
            </div>
            <div fd-settings-detail-area>
                <fd-button fd-settings-header-button>Header Button</fd-button>
                Detail Area
            </div>
        </fd-settings-container>
    `,
    standalone: true,
    imports: [SettingsContainerComponent, ListItemComponent, ButtonComponent, SettingsHeaderButtonDirective]
})
class TestComponent {
    @ViewChild('componentElement', { static: true }) ref!: ElementRef;
    @ViewChild(SettingsContainerComponent, { static: true }) settingsContainer!: SettingsContainerComponent;
    @ViewChild('listItem', { static: true }) listItem!: ListItemComponent;
}

describe('SettingsContainerComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let settingsContainer: SettingsContainerComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        settingsContainer = component.settingsContainer;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
        expect(settingsContainer).toBeTruthy();
    });

    it('should apply the correct default class', () => {
        expect(component.ref.nativeElement.classList.contains('fd-settings__container')).toBeTrue();
    });

    it('should apply view mode classes based on screen width', () => {
        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(500);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__container--sm')).toBeTrue();

        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(800);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__container--md')).toBeTrue();

        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(1400);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList.contains('fd-settings__container--lg')).toBeTrue();
    });

    it('should toggle list and detail area visibility based on view mode', () => {
        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(500);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(settingsContainer.showListArea()).toBeTrue();
        expect(settingsContainer.showDetailArea()).toBeFalse();

        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(1400);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(settingsContainer.showListArea()).toBeTrue();
        expect(settingsContainer.showDetailArea()).toBeTrue();
    });

    it('should update active list item on click', () => {
        const listItem = component.listItem;
        listItem.selected = false;
        fixture.detectChanges();

        listItem.elementRef.nativeElement.click();
        fixture.detectChanges();

        expect(settingsContainer.activeListItem()).toBe(listItem);
        expect(listItem.selected).toBeTrue();
    });

    it('should hide list area and show detail area when list item is clicked in non-lg view mode', () => {
        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(800);
        settingsContainer.onWindowResize();
        fixture.detectChanges();

        component.listItem.elementRef.nativeElement.click();
        fixture.detectChanges();

        expect(settingsContainer.showListArea()).toBeFalse();
        expect(settingsContainer.showDetailArea()).toBeTrue();
    });

    it('should toggle visibility of header button based on view mode', () => {
        const buttonElement = fixture.nativeElement.querySelector('[fd-settings-header-button]');
        expect(buttonElement).toBeTruthy();

        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(1400);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(buttonElement.style.display).toBe('none');

        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(500);
        settingsContainer.onWindowResize();
        fixture.detectChanges();
        expect(buttonElement.style.display).toBe('block');
    });

    it('should show list area and hide detail area when header button is clicked in non-lg mode', () => {
        const buttonElement = fixture.nativeElement.querySelector('[fd-settings-header-button]');
        spyOnProperty(settingsContainer, 'screenWidth', 'get').and.returnValue(500);
        settingsContainer.onWindowResize();
        fixture.detectChanges();

        buttonElement.click();
        fixture.detectChanges();

        expect(settingsContainer.showListArea()).toBeTrue();
        expect(settingsContainer.showDetailArea()).toBeFalse();
    });

    it('should clean up event listeners on destroy', () => {
        spyOn(settingsContainer['_eventUnlisteners'], 'forEach');
        settingsContainer.ngOnDestroy();
        expect(settingsContainer['_eventUnlisteners'].forEach).toHaveBeenCalled();
        expect(settingsContainer['_eventUnlisteners'].length).toBe(0);
    });
});
