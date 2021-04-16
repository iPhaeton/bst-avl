import { BalanceManager } from "src/managers/BalanceManager";
import { Composition } from "src/managers/Composition";
import { HeightManager } from "src/managers/HeightManager";
import { ManagedNode } from "src/nodes/ManagedNode";
import { AVL } from "src/trees/AVL";
import { HeightStats } from "src/types";

const createTestTree = (): [AVL<number>, ManagedNode<number, HeightStats>[]] => {
    const tree = new AVL<number>();
    const heightManager = new HeightManager<number>();
    const balanceManager = new BalanceManager<number>();
    const manager = new Composition(heightManager, balanceManager, heightManager);

    const nodes = [
        new ManagedNode<number, HeightStats>(1, 1, manager),
        new ManagedNode<number, HeightStats>(10, 10, manager),
        new ManagedNode<number, HeightStats>(20, 20, manager),
        new ManagedNode<number, HeightStats>(25, 25, manager),
        new ManagedNode<number, HeightStats>(30, 30, manager),
        new ManagedNode<number, HeightStats>(35, 35, manager),
    ];

    tree.insert(nodes[0]);
    tree.insert(nodes[1]);
    tree.insert(nodes[2]);
    tree.insert(nodes[3]);
    tree.insert(nodes[4]);
    tree.insert(nodes[5]);

    return [tree, nodes];
}

describe('AVL', () => {
    describe('insert', () => {
        it('should insert nodes into the tree while maintaining the AVL representation invariant', () => {
            const [tree] = createTestTree();
            expect(tree._checkRI()).toBe(true);
        });
    });
});