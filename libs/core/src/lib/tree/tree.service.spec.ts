import { TreeService } from './tree.service';

describe('TreeService', () => {
    let service: TreeService;

    beforeEach(() => {
        service = new TreeService();
    });

    it("should add new expandable level and emit it's value", () => {
        const emitterSpy = spyOn((service as any)._expandedLevel, 'next').and.callThrough();
        service.addExpandableItem('id1', 1, false);
        service.addExpandableItem('id2', 2, false);
        // No levels are expanded
        expect(emitterSpy).toHaveBeenCalledWith(undefined);
        service.addExpandableItem('id1', 1, true);
        expect(emitterSpy).toHaveBeenCalledWith(1);
        service.addExpandableItem('id2', 2, true);
        expect(emitterSpy).toHaveBeenCalledWith(2);
    });

    it('should remove expandable level and emit new level', () => {
        const emitterSpy = spyOn((service as any)._expandedLevel, 'next').and.callThrough();
        service.addExpandableItem('id1', 1, true);
        service.addExpandableItem('id2', 2, true);
        expect(emitterSpy).toHaveBeenCalledWith(2);
        service.removeExpandableItem('id2', 2);
        expect(emitterSpy).toHaveBeenCalledWith(1);
        service.removeExpandableItem('id1', 1);
        expect(emitterSpy).toHaveBeenCalledWith(undefined);
    });
});
