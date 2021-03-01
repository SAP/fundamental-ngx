import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ObjectAttributeComponent } from './object-attribute.component';


@Component({
    selector: 'fdp-object-attribute-test',
    template: ` <fdp-object-attribute label="label1"></fdp-object-attribute> `
})
class TestComponent { }

describe('ObjectAttributeComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectAttributeComponent, TestComponent],
            providers: []
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

    /** check if element css class attached */
    it('should have fd-object-attribute class', () => {
        const attributeElement = fixture.debugElement.query(By.css('fdp-object-attribute'));
        expect(attributeElement.nativeElement.classList.contains('fd-object-attribute')).toBe(true);
    });

    /** check if element should have title */
    it('should have title label1', () => {
        const attributeElement = fixture.debugElement.query(By.css('fdp-object-attribute'));
        expect(attributeElement.nativeElement.title).toContain('label1');
    });

    /** check if element should have inner content as label1 */
    it('should have label1', () => {
        const attributeElement = fixture.debugElement.query(By.css('fdp-object-attribute'));
        expect(attributeElement.nativeElement.innerHTML).toContain('label1');
    });
});

/** testing content projection */
@Component({
    template: '<fdp-object-attribute> testing </fdp-object-attribute> '
})
export class ObjectAttributeContentProjectionTesterComponent {
}

describe('Content projection', () => {

    let component: ObjectAttributeContentProjectionTesterComponent;
    let fixture: ComponentFixture<ObjectAttributeContentProjectionTesterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectAttributeComponent, ObjectAttributeContentProjectionTesterComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectAttributeContentProjectionTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Content projection should display the text', async () => {
        fixture = TestBed.createComponent(ObjectAttributeContentProjectionTesterComponent);
        component = fixture.componentInstance;
        const innerHtml = fixture.debugElement.query(By.css('fdp-object-attribute')).nativeElement.innerHTML;
        expect(innerHtml).toContain('testing');
    });
});

/** testing link */
@Component({
    selector: 'fdp-object-attribute-test',
    template: ` <fdp-object-attribute linkText="label1" islink="true"></fdp-object-attribute> `
})
class TestComponentLink { }

describe('ObjectAttributeComponent With Link', () => {
    let component: TestComponentLink;
    let fixture: ComponentFixture<TestComponentLink>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectAttributeComponent, TestComponentLink],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentLink);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /** check if link element has css class attached */
    it('should have fd-object-attribute--link class', () => {
        const linkedElement = fixture.debugElement.query(By.css('span'));
        expect(linkedElement.nativeElement.classList.contains('fd-object-attribute--link')).toBe(true);
    });

    /** check if link element have inner content as label1 */
    it('should have title as label1', () => {
        const linkedElement = fixture.debugElement.query(By.css('span'));
        expect(linkedElement.nativeElement.title).toContain('label1');
    });

    /** check if link element have inner content as label1 */
    it('should have inner html content as label1', () => {
        const linkedElement = fixture.debugElement.query(By.css('span'));
        expect(linkedElement.nativeElement.innerHTML).toContain('label1');
    });
});
