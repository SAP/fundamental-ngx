import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TileComponent } from './tile.component';
import { TileModule } from '../tile/tile.module';

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TileComponent],
            imports: [TileModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });

    it('should buildComponentCssClass after view init', () => {
        spyOn(component, 'buildComponentCssClass');
        component.ngAfterViewInit();
        expect(component.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should buildComponentCssClass after changes', () => {
        spyOn(component, 'buildComponentCssClass');
        component.ngOnChanges();
        expect(component.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should return the proper string fro buildComponentCssClass', () => {
        component.type = 'kpi';
        component.action = true;
        component.double = true;
        component.size = 's';
        component.class = 'test-class';

        const retVal = component.buildComponentCssClass();

        expect(retVal).toContain('fd-tile');
        expect(retVal).toContain('fd-tile--s');
        expect(retVal).toContain('fd-tile--double');
        expect(retVal).toContain('fd-tile--kpi');
        expect(retVal).toContain('fd-tile--action');
        expect(retVal).toContain('test-class');
    });
});
