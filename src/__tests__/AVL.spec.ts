import { AVLNode } from "src/nodes/AVLNode";
import { ManagedNode } from "src/nodes/ManagedNode";
import { AVL } from "src/trees/AVL";
import { HeightStats } from "src/types";

const createTestTree = (): [AVL<number>, ManagedNode<number, HeightStats>[]] => {
    const tree = new AVL<number>();

    const nodes = [
        new AVLNode(1, 1),
        new AVLNode(10, 10),
        new AVLNode(20, 20),
        new AVLNode(25, 25),
        new AVLNode(30, 30),
        new AVLNode(35, 35),
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
            expect(tree._checkAVLRI()).toBe(true);
        });
    });

    describe('_checkAVLRI', () => {
        it('should return true, if AVL representation invariant is valid', () => {
            const [tree] = createTestTree();

            expect(tree._checkAVLRI()).toBe(true);
        });

        it('should throw, if AVL representation invariant is not valid', () => {
            const [tree, nodes] = createTestTree();
            nodes[2].stats.h = 3;

            expect(tree._checkAVLRI).toThrow();
        });

        it('should throw, if _checkRI throws', () => {
            const [tree] = createTestTree();
            tree._checkRI = jest.fn(() => {throw new Error('Test error')});

            expect(tree._checkAVLRI).toThrow();
        })
    });
});