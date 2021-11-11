import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TruncateDirective } from './truncate.directive';

@Component({
    template: `
        <span fd-truncate [fdTruncateState]="true" [fdTruncateChars]="maxChars" [fdTruncateTargetText]="text"> </span>
    `
})
class TestComponent {
    @Input()
    text: string;

    @Input()
    maxChars: number;
}

describe('TruncateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let truncate: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TruncateDirective]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.maxChars = 500;
        component.text =
            'Long text, you can toggle view with more/less button. Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        fixture.detectChanges();
        truncate = fixture.debugElement.query(By.directive(TruncateDirective));
    });

    it('should create an instance', () => {
        expect(truncate).toBeTruthy();
    });
});
