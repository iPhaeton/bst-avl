import { BST } from '../BST';
import { Node } from '../Node';

describe('BST', () => {
    describe('insert', () => {
        it('should insert nodes into the tree while maintaining size and representation invariant', () => {
            const tree = new BST();
            expect(tree.size).toBe(0);
            tree.insert(new Node(23, 23));
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

    describe('_checkRI', () => {
        it('should return true, if representation invariant is valid', () => {
            const tree = new BST();
            tree.insert(new Node(23, 23));
            tree.insert(new Node(8, 8));
            tree.insert(new Node(4, 4));
            tree.insert(new Node(16, 16));
            tree.insert(new Node(15, 15));
            tree.insert(new Node(17, 17));
            tree.insert(new Node(18, 18));
            tree.insert(new Node(42, 42));
            tree.insert(new Node(33, 33));

            expect(tree._checkRI()).toBe(true);
        });

        it('should throw, if representation invariant is invalid', () => {
            const tree = new BST();
            tree.insert(new Node(23, 23));
            tree.insert(new Node(8, 8));
            const brokenNodeParent = new Node(4, 4);
            tree.insert(brokenNodeParent);
            tree.insert(new Node(16, 16));
            const brokenNode = new Node(15, 15);
            tree.insert(brokenNode);
            tree.insert(new Node(17, 17));
            tree.insert(new Node(18, 18));
            tree.insert(new Node(42, 42));
            tree.insert(new Node(33, 33));
            brokenNodeParent.right = brokenNode;
            brokenNode.parent = brokenNodeParent;

            expect(tree._checkRI.bind(tree)).toThrow();
        });
    });
});