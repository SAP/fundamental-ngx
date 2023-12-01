import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ObjectAttributeComponent } from './object-attribute.component';

@Component({
    selector: 'fd-object-attribute-test',
    template: ` <fd-object-attribute label="label1"></fd-object-attribute> `,
    standalone: true,
    imports: [ObjectAttributeComponent]
})
class TestComponent {}

describe('ObjectAttributeComponent', () => {
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

    /** check if element css class attached */
    it('should have fd-object-attribute class', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-object-attribute'));
        expect(attributeElement.nativeElement.classList.contains('fd-object-attribute')).toBe(true);
    });

    /** check if element should have title */
    it('should have title label1', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-object-attribute'));
        expect(attributeElement.nativeElement.title).toContain('label1');
    });

    /** check if element should have inner content as label1 */
    it('should have label1', () => {
        const attributeElement = fixture.debugElement.query(By.css('fd-object-attribute'));
        expect(attributeElement.nativeElement.innerHTML).toContain('label1');
    });
});

/** testing content projection */
@Component({
    template: '<fd-object-attribute> testing </fd-object-attribute> ',
    standalone: true,
    imports: [ObjectAttributeComponent]
})
export class ObjectAttributeContentProjectionTesterComponent {}

describe('Content projection', () => {
    let fixture: ComponentFixture<ObjectAttributeContentProjectionTesterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ObjectAttributeContentProjectionTesterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectAttributeContentProjectionTesterComponent);
        fixture.detectChanges();
    });

    it('Content projection should display the text', async () => {
        fixture = TestBed.createComponent(ObjectAttributeContentProjectionTesterComponent);
        const innerHtml = fixture.debugElement.query(By.css('fd-object-attribute')).nativeElement.innerHTML;
        expect(innerHtml).toContain('testing');
    });
});

/** testing link */
@Component({
    selector: 'fd-object-attribute-test',
    template: ` <fd-object-attribute linkText="label1" islink="true"></fd-object-attribute> `,
    standalone: true,
    imports: [ObjectAttributeComponent]
})
class LinkTestComponent {}

describe('ObjectAttributeComponent With Link', () => {
    let component: LinkTestComponent;
    let fixture: ComponentFixture<LinkTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LinkTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkTestComponent);
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
