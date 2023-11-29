import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationListItemAltComponent } from './navigation-list-item.component';

describe('NavigationListItemComponent', () => {
    let component: NavigationListItemAltComponent;
    let fixture: ComponentFixture<NavigationListItemAltComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationListItemAltComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationListItemAltComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
