import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShellbarModule } from '../shellbar.module';
import { ProductMenuComponent } from './product-menu.component';

describe('ProductMenuComponent', () => {
    let component: ProductMenuComponent;
    let fixture: ComponentFixture<ProductMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
