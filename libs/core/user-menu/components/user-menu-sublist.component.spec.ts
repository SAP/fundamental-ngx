import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { UserMenuSublistComponent } from './user-menu-sublist.component';

@Component({
    template: `<div fd-user-menu-sublist #elRef [hasIcons]="hasIcons">User Menu Sublist Test</div>`,
    standalone: true,
    imports: [UserMenuSublistComponent]
})
class TestHostComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;

    hasIcons = false;
}

describe('UserMenuSublistComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [KeyboardSupportService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.elRef.nativeElement.classList).toContain('fd-menu');
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu__menu');
    });

    it('should add modifier class', () => {
        component.hasIcons = true;
        fixture.detectChanges();
        expect(component.elRef.nativeElement.classList).toContain('fd-menu--icons');
    });
});
