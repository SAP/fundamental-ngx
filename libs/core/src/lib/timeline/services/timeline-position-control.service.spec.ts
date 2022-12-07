import { TestBed } from '@angular/core/testing';

import { TimelineNodeComponent } from '../components/timeline-node/timeline-node.component';

import { TimelinePositionControlService } from './timeline-position-control.service';
import { HorizontalSingleSideStrategy } from './position-strategies/horizontal-single-side-strategy';
import { VerticalSingleSideStrategy } from './position-strategies/vertical-single-side-strategy';
import { VerticalDoubleSidesStrategy } from './position-strategies/vertical-double-sides-strategy';
import { HorizontalDoubleSidesStrategy } from './position-strategies/horizontal-double-sides-strategy';

describe('TimelinePositionControlService', () => {
    let service: TimelinePositionControlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimelinePositionControlService]
        });
        service = TestBed.inject(TimelinePositionControlService);
    });

    it('should create correctInstance of position control strategy', () => {
        service.setStrategy('vertical-right');
        expect(service['_positionStrategy']).toBeInstanceOf(VerticalSingleSideStrategy);

        service.setStrategy('vertical-double');
        expect(service['_positionStrategy']).toBeInstanceOf(VerticalDoubleSidesStrategy);

        service.setStrategy('horizontal-top');
        expect(service['_positionStrategy']).toBeInstanceOf(HorizontalSingleSideStrategy);

        service.setStrategy('horizontal-double');
        expect(service['_positionStrategy']).toBeInstanceOf(HorizontalDoubleSidesStrategy);

        service.setStrategy('horizontal-double');
        expect(service['_positionStrategy']).toBeInstanceOf(HorizontalDoubleSidesStrategy);

        expect(() => service.setStrategy('horizontal-left')).toThrow(
            new Error('Unsupported strategy: horizontal-left')
        );
    });

    it('should register timeline node', () => {
        service.registerNode({} as TimelineNodeComponent);
        expect(service['_nodeItems'].length).toBe(1);
    });

    it('should remove timeline node', () => {
        const fakeNode = {};
        service.registerNode(fakeNode as TimelineNodeComponent);
        service.removeNode(fakeNode as TimelineNodeComponent);
        expect(service['_nodeItems'].length).toBe(0);
    });
});
