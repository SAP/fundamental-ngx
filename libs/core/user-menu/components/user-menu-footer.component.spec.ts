import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UserMenuFooterComponent } from './user-menu-footer.component';

@Component({
    template: `<fd-user-menu-footer><p>Footer Content</p></fd-user-menu-footer>`
})
class TestHostComponent {}

describe('UserMenuFooterComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [UserMenuFooterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        const footerEl = fixture.nativeElement.querySelector('fd-user-menu-footer');
        expect(footerEl).toBeTruthy();
    });

    it('should project content inside', () => {
        const footerEl = fixture.nativeElement.querySelector('fd-user-menu-footer');
        expect(footerEl.textContent).toContain('Footer Content');
    });
});
