import { ManagedNode } from '../nodes/ManagedNode';
import { HeightManager } from '../managers/HeightManager';
import { HeightStats } from '../types';

describe('HeightManager', () => {
    let manager: HeightManager<number>;
    beforeAll(() => {
        manager = new HeightManager();
    });

    describe('getDefaultStats', () => {
        it('should return default haight stats', () => {
            expect(manager.getDefaultStats()).toEqual({ h: 0 });
        });
    });

    describe('manageStats', () => {
        it("should calculate a node's height", () => {
            const left = new ManagedNode<number, HeightStats>(1, 1, manager);
            const right = new ManagedNode<number, HeightStats>(3, 3, manager);
            const node = new ManagedNode<number, HeightStats>(2, 2, manager);
            node.left = left;
            node.right = right;
            left.stats.h = 4;
            right.stats.h = 7;

            expect(node.manage()).toEqual({ h: 8 });
        });

        it('should calculate a node without children height', () => {
            const left = null;
            const right = null;
            const node = new ManagedNode<number, HeightStats>(2, 2, manager);
            node.left = left;
            node.right = right;

            expect(node.manage()).toEqual({ h: 1 });
        });
    });
});
