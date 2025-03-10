import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuComponent } from './user-menu.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    template: `<fd-user-menu #elRef>User Menu Test</fd-user-menu>`,
    standalone: true,
    imports: [UserMenuComponent]
})
class TestHostComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;

     hasIcons = false;
}

describe('UserMenuComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [RtlService, DialogService]
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
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu');
    });
});
