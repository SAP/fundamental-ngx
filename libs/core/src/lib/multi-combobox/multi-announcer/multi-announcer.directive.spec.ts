import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MultiAnnouncerDirective } from './multi-announcer.directive';

@Component({
    template: ` <input [options]="values" fdMultiAnnouncer />`
})
class TestComponent {
    @ViewChild(MultiAnnouncerDirective)
    multiAnnouncerDirective: MultiAnnouncerDirective;

    values: string[] = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}

describe('MultiAnnouncerDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: MultiAnnouncerDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [MultiAnnouncerDirective]
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
