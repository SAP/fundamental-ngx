import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListComponent } from './feed-list.component';

describe('FeedListComponent', () => {
    let component: FeedListComponent;
    let fixture: ComponentFixture<FeedListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeedListComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have mobile class', () => {
        component.mobile = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-feed-list--s')).toBeTruthy();
    });

    it('should have border less class', () => {
        component.borderLess = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-feed-list--no-border')).toBeTruthy();
    });
});
