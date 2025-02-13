import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsDialogBodyDirective } from '@fundamental-ngx/core/settings';

@Component({
    template: ` <div #directiveElement fd-settings-dialog-body>Settings Dialog Body Test Text</div> `,
    standalone: true,
    imports: [SettingsDialogBodyDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('SettingsDialogBodyDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.classList.contains('fd-settings__dialog-body')).toBeTrue();
    });
});
