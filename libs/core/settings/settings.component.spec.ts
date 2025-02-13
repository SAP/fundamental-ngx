import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsComponent } from './index';

@Component({
    template: ` <div #componentElement fd-settings>Settings Component Test Text</div> `,
    standalone: true,
    imports: [SettingsComponent]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef, static: true })
    ref!: ElementRef;
}

describe('SettingsComponent', () => {
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
        expect(component.ref.nativeElement.classList.contains('fd-settings')).toBeTrue();
    });
});
