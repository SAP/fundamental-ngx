import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContentStartComponent } from './navigation-content-start.component';

describe('NavigationListItemComponent', () => {
    let component: NavigationContentStartComponent;
    let fixture: ComponentFixture<NavigationContentStartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationContentStartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContentStartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
