import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationItemSpacerComponent } from './navigation-item-spacer.component';

describe('NavigationItemSpacerComponent', () => {
    let component: NavigationItemSpacerComponent;
    let fixture: ComponentFixture<NavigationItemSpacerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationItemSpacerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationItemSpacerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
