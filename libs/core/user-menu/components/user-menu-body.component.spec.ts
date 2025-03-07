import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { UserMenuBodyComponent } from './user-menu-body.component';
import { UserMenuHeaderDirective } from '../directives/user-menu-header.directive';
import { UserMenuContentContainerComponent } from './user-menu-content-container.component';

@Component({
    template: `
        <fd-user-menu-body #elRef>
            <div fd-user-menu-header></div>
            <div fd-user-menu-content-container></div>
        </fd-user-menu-body>
    `,
    standalone: true,
    imports: [UserMenuBodyComponent, UserMenuHeaderDirective, UserMenuContentContainerComponent]
})
class TestComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;
}

describe('UserMenuBodyComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu__body');
    });
});

