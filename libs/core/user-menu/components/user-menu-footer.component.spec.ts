import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuFooterComponent } from './user-menu-footer.component';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `<fd-user-menu-footer #elRef>User Menu Footer Test</fd-user-menu-footer>`,
    standalone: true,
    imports: [UserMenuFooterComponent]
})
class TestHostComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;
}

describe('UserMenuFooterComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
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
