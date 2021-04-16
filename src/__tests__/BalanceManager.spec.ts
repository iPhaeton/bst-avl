import { ManagedNode } from "src/nodes/ManagedNode";
import { Plotter } from "src/Plotter";
import { BalanceManager } from "src/managers/BalanceManager";
import { HeightManager } from "src/managers/HeightManager";
import { AVL } from "src/trees/AVL";
import { HeightStats } from "src/types";

const createTestTree = (): [AVL<number>, ManagedNode<number, HeightStats>[]] => {
    const tree = new AVL<number>();
    const heightManager = new HeightManager<number>();

    const nodes = [
        new ManagedNode<number, HeightStats>(15, 15, heightManager),
        new ManagedNode<number, HeightStats>(10, 10, heightManager),
        new ManagedNode<number, HeightStats>(20, 20, heightManager),
        new ManagedNode<number, HeightStats>(12, 12, heightManager),
        new ManagedNode<number, HeightStats>(14, 14, heightManager),
        new ManagedNode<number, HeightStats>(8, 8, heightManager),
        new ManagedNode<number, HeightStats>(7, 7, heightManager),
        new ManagedNode<number, HeightStats>(9, 9, heightManager),
        new ManagedNode<number, HeightStats>(17, 17, heightManager),
        new ManagedNode<number, HeightStats>(22, 22, heightManager),
        new ManagedNode<number, HeightStats>(16, 16, heightManager),
        new ManagedNode<number, HeightStats>(21, 21, heightManager),
        new ManagedNode<number, HeightStats>(23, 23, heightManager),
    ];

    tree.insert(nodes[0]);
    tree.insert(nodes[1]);
    tree.insert(nodes[2]);
    tree.insert(nodes[3]);
    tree.insert(nodes[4]);
    tree.insert(nodes[5]);
    tree.insert(nodes[6]);
    tree.insert(nodes[7]);
    tree.insert(nodes[8]);
    tree.insert(nodes[9]);
    tree.insert(nodes[10]);
    tree.insert(nodes[11]);
    tree.insert(nodes[12]);


    return [tree, nodes];
};

describe('BalanceManger', () => {
    let manager: BalanceManager<number>;
    beforeAll(() => {
        manager = new BalanceManager<number>();
    });

    describe('rotateRight', () => {
        it('should rotate right', () => {
            const [tree, nodes] = createTestTree();
            manager['rotateRight'](nodes[1], tree);
            expect(nodes[1].parent).toBe(nodes[5]);
            expect(nodes[5].right).toBe(nodes[1]);
            expect(nodes[1].left).toBe(nodes[7]);
            expect(nodes[7].parent).toBe(nodes[1]);
            expect(nodes[1].right).toBe(nodes[3]);
            expect(nodes[3].parent).toBe(nodes[1]);
            expect(nodes[5].left).toBe(nodes[6]);
            expect(nodes[6].parent).toBe(nodes[5]);
            expect(tree._checkRI()).toBe(true);
        });

        it('should rotate the root node', () => {
            const [tree, nodes] = createTestTree();
            manager['rotateRight'](nodes[0], tree);
            expect(tree.root).toBe(nodes[1]);
            expect(nodes[1].parent).toBe(null);
            expect(nodes[1].right).toBe(nodes[0]);
            expect(nodes[0].parent).toBe(nodes[1]);
            expect(nodes[0].left).toBe(nodes[3]);
            expect(nodes[3].parent).toBe(nodes[0]);
            expect(nodes[0].right).toBe(nodes[2]);
            expect(nodes[2].parent).toBe(nodes[0]);
            expect(nodes[1].left).toBe(nodes[5]);
            expect(nodes[5].parent).toBe(nodes[1]);
            expect(tree._checkRI()).toBe(true);
        });

        it('should not rotate a node without the left child', () => {
            const [tree, nodes] = createTestTree();
            const parent = nodes[3].parent;
            const left = nodes[3].left;
            const right = nodes[3].right;
            manager['rotateRight'](nodes[3], tree);
            expect(nodes[3].parent).toBe(parent);
            expect(nodes[3].left).toBe(left);
            expect(nodes[3].right).toBe(right);
            expect(tree._checkRI()).toBe(true);
        });
    });

    describe('rotateLeft', () => {
        it('should rotate left', () => {
            const [tree, nodes] = createTestTree();
            manager['rotateLeft'](nodes[2], tree);
            expect(nodes[9].left).toBe(nodes[2]);
            expect(nodes[2].parent).toBe(nodes[9]);
            expect(nodes[2].right).toBe(nodes[11]);
            expect(nodes[11].parent).toBe(nodes[2]);
            expect(nodes[2].left).toBe(nodes[8]);
            expect(nodes[8].parent).toBe(nodes[2]);
            expect(nodes[9].right).toBe(nodes[12]);
            expect(nodes[12].parent).toBe(nodes[9]);
            expect(tree._checkRI()).toBe(true);
        });

        it('should rotate the root node', () => {
            const [tree, nodes] = createTestTree();
            manager['rotateLeft'](nodes[0], tree);
            expect(tree.root).toBe(nodes[2]);
            expect(nodes[2].parent).toBe(null);
            expect(nodes[2].left).toBe(nodes[0]);
            expect(nodes[0].parent).toBe(nodes[2]);
            expect(nodes[0].right).toBe(nodes[8]);
            expect(nodes[8].parent).toBe(nodes[0]);
            expect(nodes[0].left).toBe(nodes[1]);
            expect(nodes[1].parent).toBe(nodes[0]);
            expect(nodes[2].right).toBe(nodes[9]);
            expect(nodes[9].parent).toBe(nodes[2]);
            expect(tree._checkRI()).toBe(true);
        });

        it('should not rotate a node without the right child', () => {
            const [tree, nodes] = createTestTree();
            const parent = nodes[8].parent;
            const left = nodes[8].left;
            const right = nodes[8].right;
            manager['rotateLeft'](nodes[8], tree);
            expect(nodes[8].parent).toBe(parent);
            expect(nodes[8].left).toBe(left);
            expect(nodes[8].right).toBe(right);
            expect(tree._checkRI()).toBe(true);
        });
    });

    describe('manage', () => {
        let balanceManager: BalanceManager<number>;
        let heightManager: HeightManager<number>;
        beforeAll(() => {
            heightManager = new HeightManager<number>();
            balanceManager = new BalanceManager<number>();

            balanceManager['rotateLeft'] = jest.fn();
            balanceManager['rotateRight'] = jest.fn();
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should call "rotateRight", if left node is heavier and heavy nodes are in a straight line', () => {
            const nodes = [
                new ManagedNode<number, HeightStats>(15, 15, heightManager),
                new ManagedNode<number, HeightStats>(10, 10, heightManager),
                new ManagedNode<number, HeightStats>(20, 20, heightManager),
                new ManagedNode<number, HeightStats>(5, 5, heightManager),
                new ManagedNode<number, HeightStats>(1, 1, heightManager),
            ];

            const tree = new AVL<number>();

            tree.insert(nodes[0]);
            tree.insert(nodes[1]);
            tree.insert(nodes[2]);
            tree.insert(nodes[3]);
            tree.insert(nodes[4]);

            balanceManager.manage(nodes[1], tree);
            expect(balanceManager['rotateRight']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateLeft']).toHaveBeenCalledTimes(0);
            expect(balanceManager['rotateRight']).toBeCalledWith(nodes[1], tree);
        });

        it('should call "rotateRight", if left node is heavier and heavy nodes are in a zig-zag', () => {
            const nodes = [
                new ManagedNode<number, HeightStats>(15, 15, heightManager),
                new ManagedNode<number, HeightStats>(10, 10, heightManager),
                new ManagedNode<number, HeightStats>(20, 20, heightManager),
                new ManagedNode<number, HeightStats>(5, 5, heightManager),
                new ManagedNode<number, HeightStats>(7, 7, heightManager),
            ];

            const tree = new AVL<number>();

            tree.insert(nodes[0]);
            tree.insert(nodes[1]);
            tree.insert(nodes[2]);
            tree.insert(nodes[3]);
            tree.insert(nodes[4]);

            balanceManager.manage(nodes[1], tree);
            expect(balanceManager['rotateRight']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateLeft']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateRight']).toBeCalledWith(nodes[1], tree);
            expect(balanceManager['rotateLeft']).toBeCalledWith(nodes[1].left, tree);
        });

        it('should call "rotateRight" and "rotateLeft", if right node is heavier and heavy nodes are in a straight line', () => {
            const nodes = [
                new ManagedNode<number, HeightStats>(15, 15, heightManager),
                new ManagedNode<number, HeightStats>(10, 10, heightManager),
                new ManagedNode<number, HeightStats>(20, 20, heightManager),
                new ManagedNode<number, HeightStats>(25, 25, heightManager),
                new ManagedNode<number, HeightStats>(30, 30, heightManager),
            ];

            const tree = new AVL<number>();

            tree.insert(nodes[0]);
            tree.insert(nodes[1]);
            tree.insert(nodes[2]);
            tree.insert(nodes[3]);
            tree.insert(nodes[4]);

            balanceManager.manage(nodes[2], tree);
            expect(balanceManager['rotateLeft']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateRight']).toHaveBeenCalledTimes(0);
            expect(balanceManager['rotateLeft']).toBeCalledWith(nodes[2], tree);
        });

        it('should call "rotateLeft" and "rotateRight", if right node is heavier and heavy nodes are in a zig-zag', () => {
            const nodes = [
                new ManagedNode<number, HeightStats>(15, 15, heightManager),
                new ManagedNode<number, HeightStats>(10, 10, heightManager),
                new ManagedNode<number, HeightStats>(20, 20, heightManager),
                new ManagedNode<number, HeightStats>(25, 25, heightManager),
                new ManagedNode<number, HeightStats>(21, 21, heightManager),
            ];

            const tree = new AVL<number>();

            tree.insert(nodes[0]);
            tree.insert(nodes[1]);
            tree.insert(nodes[2]);
            tree.insert(nodes[3]);
            tree.insert(nodes[4]);

            balanceManager.manage(nodes[2], tree);
            expect(balanceManager['rotateLeft']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateRight']).toHaveBeenCalledTimes(1);
            expect(balanceManager['rotateLeft']).toBeCalledWith(nodes[2], tree);
            expect(balanceManager['rotateRight']).toBeCalledWith(nodes[2].right, tree);
        });
    });
});