import { Component, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { closestElement } from './closest-element';

@Component({
    template: `
        <article class="article-class">
            <div id="div-01" class="div-class">Here is div-01
                <div id="" class="div-class">Here is div-02
                    <div id="div-03">Here is div-03</div>
                </div>
            </div>
        </article>
    `
})
class TestComponent {
    constructor(public elementRef: ElementRef) {}
}
describe('closestElement', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
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

    it('should return proper HTML Element', () => {

        expect(closestElement('div', component.elementRef)).toBe(fixture.nativeElement.querySelector('div-03'));
        expect(closestElement('.article-class', component.elementRef)).toBe(fixture.nativeElement.querySelector('article'));
        expect(closestElement('.div-class', component.elementRef)).toBe(fixture.nativeElement.querySelector('#div-02'));
        expect(closestElement('#div-03', component.elementRef)).toBe(fixture.nativeElement.querySelector('#div-03'));
        expect(closestElement('article > div', component.elementRef)).toBe(fixture.nativeElement.querySelector('#div-01'));
        expect(closestElement(':not(div)', component.elementRef)).toBe(fixture.nativeElement.querySelector('article'));
    });
});
