import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    FacetModule,
    FacetComponent,
    AvatarModule,
    FacetContentComponent,
    IconModule,
    LinkModule,
    ObjectNumberModule,
    ObjectStatusModule,
    RatingIndicatorModule,
    TextModule,
} from '@fundamental-ngx/core';
import { FACET_CLASS_NAME } from '../constants';

@Component({
    template: `
        <fd-facet type="form" facetTitle="Technical Data" id="formFacetExample">
            <fd-facet-content>
                <label class="fd-form-label" for="form-value-1">Base unit:</label>
                <fd-text text="Each" id="form-value-1"></fd-text>
            </fd-facet-content>
            <fd-facet-content>
                <label class="fd-form-label" for="form-value-2">Length:</label>
                <div class="fd-text" id="form-value-2">23.24 Centimeter</div>
            </fd-facet-content>
            <fd-facet-content>
                <label class="fd-form-label" for="form-value-3">Width:</label>
                <div class="fd-text" id="form-value-3">86.1 Centimeter</div>
            </fd-facet-content>
            <fd-facet-content>
                <fd-icon glyph="email"></fd-icon>
                <a [routerLink]="['./']" fd-link tabindex="0">john.miller@company.com</a>
            </fd-facet-content>
        </fd-facet>
    `
})
class TestComponent {
    title = 'Some title ';
    @ViewChild(FacetComponent) facetComponent: FacetComponent;
    @ViewChild(FacetContentComponent) facetContentComponent: FacetContentComponent;
}

describe('Form Facet Component', () => {
    let fixture: ComponentFixture<TestComponent>;
    let facetComponent: FacetComponent;
    let component: TestComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FacetModule, IconModule, LinkModule],
                declarations: [TestComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        facetComponent = component.facetComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to facet by default', async () => {
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet--form')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-end--md')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-bottom--sm')).toBeTruthy();
        expect(component.facetContentComponent.elementRef().nativeElement.classList.contains('fd-facet__container'));
    });

    it('should add tiny margin for form facet with link', async () => {
        const iconElement = fixture.debugElement.query(By.css('fd-icon'));
        fixture.detectChanges();
        expect(iconElement.nativeElement.classList.contains('fd-margin-end--tiny')).toBeTruthy();
    });
});

@Component({
    template: `
        <fd-facet type="image">
            <fd-avatar image="http://picsum.photos/id/1018/400" size="l"></fd-avatar>
        </fd-facet>
    `
})
class TestImageFacetComponent {
    @ViewChild(FacetComponent) facetComponent: FacetComponent;
}

describe('Image Facet Component', () => {
    let fixture: ComponentFixture<TestImageFacetComponent>;
    let facetComponent: FacetComponent;
    let component: TestImageFacetComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, AvatarModule, FacetModule, IconModule],
                declarations: [TestImageFacetComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestImageFacetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        facetComponent = component.facetComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to image facet by default', async () => {
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet--image')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-end--md')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-bottom--sm')).toBeFalsy();
    });

    it('should add order to image facet', async () => {
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.style.order).toBe('-1');
    });
});

@Component({
    template: `
        <fd-facet type="rating-indicator" facetTitle="Rating Indicator" subtitle="6 reviews" id="facet12">
            <fd-facet-content>
                <fd-rating-indicator size="md" dynamicTextIndicator="of" value="2.51"></fd-rating-indicator>
            </fd-facet-content>
        </fd-facet>
    `
})
class TestRatingIndicatorFacetComponent {
    @ViewChild(FacetComponent) facetComponent: FacetComponent;
    @ViewChild(FacetContentComponent) facetContentComponent: FacetContentComponent;
}

describe('Rating Indicator Facet Component', () => {
    let fixture: ComponentFixture<TestRatingIndicatorFacetComponent>;
    let facetComponent: FacetComponent;
    let component: TestRatingIndicatorFacetComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, RatingIndicatorModule, FacetModule],
                declarations: [TestRatingIndicatorFacetComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRatingIndicatorFacetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        facetComponent = component.facetComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to rating indicator facet by default', async () => {
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet--rating-indicator')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-end--md')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-bottom--sm')).toBeTruthy();
        expect(component.facetContentComponent.elementRef().nativeElement.classList.contains('fd-facet__container'));
    });

    it('should add correct classes to rating indicator component', async () => {
        const ratingIndicatorContainerElement = fixture.debugElement.query(By.css('.fd-rating-indicator__container'));
        fixture.detectChanges();
        expect(
            ratingIndicatorContainerElement.nativeElement.classList.contains(
                FACET_CLASS_NAME.facetRatingIndicatorContainer
            )
        ).toBeTruthy();

        const ratingIndicatorTextElement = fixture.debugElement.query(By.css('.fd-rating-indicator__dynamic-text'));
        fixture.detectChanges();
        expect(
            ratingIndicatorTextElement.nativeElement.classList.contains(
                FACET_CLASS_NAME.facetRatingIndicatorDynamicText
            )
        ).toBeTruthy();
        expect(ratingIndicatorTextElement.nativeElement.classList.contains('fd-margin-top--tiny')).toBeTruthy();
    });
});

@Component({
    template: `
        <fd-facet type="key-value" facetTitle="Status" id="kvFacet10">
            <span
                fd-object-status
                status="critical"
                label="12 days"
                glyph="shipping-status"
                [large]="true"
                title="12 days"
                aria-label="12 days"
            ></span>
        </fd-facet>
    `
})
class TestKeyValueFacetComponent {
    @ViewChild(FacetComponent) facetComponent: FacetComponent;
}

describe('Key Value Facet Component', () => {
    let fixture: ComponentFixture<TestKeyValueFacetComponent>;
    let facetComponent: FacetComponent;
    let component: TestKeyValueFacetComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, ObjectStatusModule, ObjectNumberModule, FacetModule, IconModule],
                declarations: [TestKeyValueFacetComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestKeyValueFacetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        facetComponent = component.facetComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to key value facet by default', async () => {
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet--key-value')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-end--md')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-bottom--sm')).toBeTruthy();
    });

    it('should add correct classes to key value component', async () => {
        const objectStatusElement = fixture.debugElement.query(By.css('.fd-object-status'));
        fixture.detectChanges();
        expect(objectStatusElement.nativeElement.classList.contains(FACET_CLASS_NAME.facetObjectStatus)).toBeTruthy();

        const objectStatusTextElement = fixture.debugElement.query(By.css('.fd-object-status__text'));
        fixture.detectChanges();
        expect(
            objectStatusTextElement.nativeElement.classList.contains(FACET_CLASS_NAME.facetObjectStatusText)
        ).toBeTruthy();
        const objectStatusIconElement = fixture.debugElement.query(By.css('.fd-object-status__icon'));
        fixture.detectChanges();
        expect(objectStatusIconElement.nativeElement.classList.contains(FACET_CLASS_NAME.paddingNone)).toBeTruthy();
        expect(objectStatusIconElement.nativeElement.classList.contains(FACET_CLASS_NAME.marginEndTiny)).toBeTruthy();
    });
});

@Component({
    template: `
        <fd-facet type="key-value" facetTitle="Pricing" id="kvFacet24" [alignEnd]="true">
            <fd-object-number
                [number]="100.88"
                [large]="true"
                unit="EUR"
                status="informative"
                [decimal]="2"
            ></fd-object-number>
        </fd-facet>
    `
})
class TestKeyValueFacetAlignmentComponent {
    @ViewChild(FacetComponent) facetComponent: FacetComponent;
}

describe('Key Value Facet Alignment Component', () => {
    let fixture: ComponentFixture<TestKeyValueFacetAlignmentComponent>;
    let facetComponent: FacetComponent;
    let component: TestKeyValueFacetAlignmentComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    ObjectStatusModule,
                    ObjectNumberModule,
                    AvatarModule,
                    FacetModule,
                    IconModule,
                    LinkModule,
                    TextModule
                ],
                declarations: [TestKeyValueFacetAlignmentComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestKeyValueFacetAlignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        facetComponent = component.facetComponent;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes when for key value facet alignEnd is set', async () => {
        facetComponent.alignEnd = true;
        fixture.detectChanges();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-facet-align-end')).toBeTruthy();
        expect(facetComponent.elementRef().nativeElement.classList.contains('fd-margin-begin--md')).toBeTruthy();
    });
});
