import { NodeWithStats } from "src/nodes/NodeWithStats";
import { BalanceManager } from "src/stats/BalanceManager";
import { HeightManager } from "src/stats/HeightManager";
import { AVL } from "src/trees/AVL";
import { HeightStats } from "src/types";

const createTestTree = (): [AVL<number>, NodeWithStats<number, HeightStats>[]] => {
    const tree = new AVL<number>();
    const heightManager = new HeightManager<number>();

    const nodes = [
        new NodeWithStats<number, HeightStats>(15, 15, heightManager),
        new NodeWithStats<number, HeightStats>(10, 10, heightManager),
        new NodeWithStats<number, HeightStats>(20, 20, heightManager),
        new NodeWithStats<number, HeightStats>(12, 12, heightManager),
        new NodeWithStats<number, HeightStats>(14, 14, heightManager),
        new NodeWithStats<number, HeightStats>(8, 8, heightManager),
        new NodeWithStats<number, HeightStats>(7, 7, heightManager),
        new NodeWithStats<number, HeightStats>(9, 9, heightManager),
        new NodeWithStats<number, HeightStats>(17, 17, heightManager),
        new NodeWithStats<number, HeightStats>(22, 22, heightManager),
        new NodeWithStats<number, HeightStats>(16, 16, heightManager),
        new NodeWithStats<number, HeightStats>(21, 21, heightManager),
        new NodeWithStats<number, HeightStats>(23, 23, heightManager),
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
            expect((tree as any).__proto__._checkRI()).toBe(true);
        });

        it('should rotate the root node', () => {
            const [tree, nodes] = createTestTree();
            const parent = nodes[0].parent
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
            expect((tree as any).__proto__._checkRI()).toBe(true);
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
            expect((tree as any).__proto__._checkRI()).toBe(true);
        });
    });
});