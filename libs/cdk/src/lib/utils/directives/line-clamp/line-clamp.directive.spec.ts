import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LineClampDirective, LineClampTargetDirective } from './line-clamp.directive';

@Component({
    template: `<div fdkLineClamp [fdLineclampState]="true" [fdLineClampLines]="rows">
        <div fdkLineClampTarget [fdLineClampTargetText]="text"></div>
    </div>`,
    standalone: true,
    imports: [LineClampDirective, LineClampTargetDirective]
})
class TestComponent {
    @Input()
    text: string;
    @Input()
    rows: number;
}

describe('LineClampDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let lineclamp: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.rows = 2;
        component.text =
            'Long text, you can toggle view with more/less button. Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
        fixture.detectChanges();
        lineclamp = fixture.debugElement.query(By.directive(LineClampDirective));
    });

    it('should create an instance', () => {
        expect(lineclamp).toBeTruthy();
    });
});
