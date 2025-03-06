import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UserMenuBodyComponent } from './user-menu-body.component';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { Subject, of } from 'rxjs';

@Component({
    template: `
        <fd-user-menu-body>
            <ng-template #submenuTpl>Submenu Content</ng-template>
        </fd-user-menu-body>
    `
})
class TestHostComponent {
    @ViewChild('submenuTpl', { static: true }) submenuTpl!: TemplateRef<any>;
    @ViewChild(UserMenuBodyComponent) userMenuBody!: UserMenuBodyComponent;
}

describe('UserMenuBodyComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;
    let userMenuBody: UserMenuBodyComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [UserMenuBodyComponent],
            providers: [
                { provide: RtlService, useValue: { rtl: of(false) } },
                { provide: KeyboardSupportService, useValue: { keyManager: null, onKeyDown: jest.fn() } }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        userMenuBody = component.userMenuBody;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(userMenuBody).toBeTruthy();
    });

    it('should handle submenu selection', () => {
        expect(userMenuBody.submenu()).toBeNull();

        userMenuBody.selectItem(component.submenuTpl);
        fixture.detectChanges();

        expect(userMenuBody.submenu()).toBe(component.submenuTpl);
    });

    it('should update selected item title', () => {
        expect(userMenuBody.selectedItemTitle()).toBeNull();

        userMenuBody.updateTitle('New Title');
        fixture.detectChanges();

        expect(userMenuBody.selectedItemTitle()).toBe('New Title');
    });

    it('should clear submenu and selected title', () => {
        userMenuBody.selectItem(component.submenuTpl);
        userMenuBody.updateTitle('New Title');
        fixture.detectChanges();

        userMenuBody.clearSubmenu();
        fixture.detectChanges();

        expect(userMenuBody.submenu()).toBeNull();
        expect(userMenuBody.selectedItemTitle()).toBeNull();
    });

    it('should prevent click event propagation', () => {
        const clickEvent = new MouseEvent('click');
        const spy = jest.spyOn(clickEvent, 'stopPropagation');

        userMenuBody.onClick(clickEvent);
        expect(spy).toHaveBeenCalled();
    });

    it('should handle keyboard events with KeyboardSupportService', () => {
        const keyboardEvent = new KeyboardEvent('keydown');
        const keyboardService = TestBed.inject(KeyboardSupportService);
        const spy = jest.spyOn(keyboardService, 'onKeyDown');

        userMenuBody.keyDownHandler(keyboardEvent);
        expect(spy).toHaveBeenCalledWith(keyboardEvent);
    });

    it('should update navigation arrow direction based on RTL', () => {
        const rtlService = TestBed.inject(RtlService);
        (rtlService.rtl as Subject<boolean>).next(true);
        fixture.detectChanges();

        userMenuBody.navigationArrow$.subscribe((icon) => {
            expect(icon).toBe('navigation-right-arrow');
        });

        (rtlService.rtl as Subject<boolean>).next(false);
        fixture.detectChanges();

        userMenuBody.navigationArrow$.subscribe((icon) => {
            expect(icon).toBe('navigation-left-arrow');
        });
    });
});
