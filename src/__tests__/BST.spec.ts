import { BST } from '../BST';
import { Node } from '../Node';

describe('BST', () => {
    describe('insert', () => {
        it('should insert nodes into the tree while maintaining size and representation invariant', () => {
            const tree = new BST();
            expect(tree.size).toBe(0);
            tree.insert(new Node(23, 23))
            expect(tree.size).toBe(1);
            tree.insert(new Node(8, 8));
            expect(tree.size).toBe(2);
            tree.insert(new Node(4, 4));
            expect(tree.size).toBe(3);
            tree.insert(new Node(16, 16));
            expect(tree.size).toBe(4);
            tree.insert(new Node(15, 15));
            expect(tree.size).toBe(5);
            tree.insert(new Node(17, 17));
            expect(tree.size).toBe(6);
            tree.insert(new Node(18, 18));
            expect(tree.size).toBe(7);
            tree.insert(new Node(42, 42));
            expect(tree.size).toBe(8);
            tree.insert(new Node(33, 33));
            expect(tree.size).toBe(9);

            expect(tree._checkRI()).toBe(true);
        });
    });
});