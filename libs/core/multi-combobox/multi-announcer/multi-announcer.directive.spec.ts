import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MultiAnnouncerDirective } from './multi-announcer.directive';

@Component({
    template: ` <input fdMultiAnnouncer />`,
    standalone: true,
    imports: [MultiAnnouncerDirective]
})
class TestComponent {
    @ViewChild(MultiAnnouncerDirective)
    multiAnnouncerDirective: MultiAnnouncerDirective;
}

describe('MultiAnnouncerDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: MultiAnnouncerDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = fixture.componentInstance.multiAnnouncerDirective;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });
});
