import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { UserMenuListComponent } from './user-menu-list.component';

@Component({
    template: `<fd-user-menu-list #elRef>User Menu List Test</fd-user-menu-list>`,
    standalone: true,
    imports: [UserMenuListComponent]
})
class TestHostComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;
}

describe('UserMenuListComponent', () => {
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
});
