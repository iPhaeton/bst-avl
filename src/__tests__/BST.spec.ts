import { BST } from '../BST';
import { Node } from '../Node';

const findByKey = (key: number) => (node: Node<any>) => node.key === key;

const createTestTree = (): [BST<number>, Node<number>[]] => {
    const nodes = [
        new Node(23, 23),
        new Node(8, 8),
        new Node(4, 4),
        new Node(16, 16),
        new Node(15, 15),
        new Node(17, 17),
        new Node(18, 18),
        new Node(42, 42),
        new Node(33, 33),
    ]

    const tree = new BST<number>();
    tree.insert(nodes[0]);
    tree.insert(nodes[1]);
    tree.insert(nodes[2]);
    tree.insert(nodes[3]);
    tree.insert(nodes[4]);
    tree.insert(nodes[5]);
    tree.insert(nodes[6]);
    tree.insert(nodes[7]);
    tree.insert(nodes[8]);
    return [tree, nodes];
};

describe('BST', () => {
    describe('h', () => {
        it('should return height of an empty tree', () => {
            const tree = new BST();
            expect(tree.h).toBe(0);
        });

        it('should return height of a tree with only the root note', () => {
            const tree = new BST();
            tree.insert(new Node(23, 23));
            expect(tree.h).toBe(1);
        });

        it('should return height of a tree', () => {
            const [tree] = createTestTree();
            expect(tree.h).toBe(5);
        });
    });

    describe('insert', () => {
        it('should insert nodes into the tree while maintaining size and representation invariant', () => {
            const [tree] = createTestTree();
            expect(tree.size).toBe(9);
            expect(tree._checkRI()).toBe(true);
        });
    });

    describe('find', () => {
        let tree: BST<number>;
        let nodes: Node<number>[];
        beforeAll(() => {
            [tree, nodes] = createTestTree();
        });

        it('should find and return a node by key', () => {
            const node1 = tree.find(17);
            expect(node1).toBe(nodes.find(findByKey(17)));

            const node2 = tree.find(15);
            expect(node2).toBe(nodes.find(findByKey(15)));
        });

        it('should find the root node by key', () => {
            const node = tree.find(23);
            expect(node).toBe(tree.root);
        });

        it('should return null, if node is not found', () => {
            const node = tree.find(99);
            expect(node).toBe(null);
        });
    });

    describe('min', () => {
        let tree: BST<number>;
        let nodes: Node<number>[];
        beforeAll(() => {
            [tree, nodes] = createTestTree();
        });

        it('should return the minimum node of a subtree', () => {
            const node = tree.min(tree.root);
            expect(node).toBe(nodes.find(findByKey(4)));
        });

        it('should return the minimum node of a tree of a single node', () => {
            const node = tree.min(nodes.find(findByKey(18)) || null);
            expect(node).toBe(nodes.find(findByKey(18)));
        });

        it('should return null if the tree is empty', () => {
            const node = tree.min(null);
            expect(node).toBe(null);
        });
    });

    describe('max', () => {
        let tree: BST<number>;
        let nodes: Node<number>[];
        beforeAll(() => {
            [tree, nodes] = createTestTree();
        });

        it('should return the maximum node of a subtree', () => {
            const node = tree.max(nodes.find(findByKey(8)) || null);
            expect(node).toBe(nodes.find(findByKey(18)));
        });

        it('should return the maximum node of a tree of a single node', () => {
            const node = tree.min(nodes.find(findByKey(18)) || null);
            expect(node).toBe(nodes.find(findByKey(18)));
        });

        it('should return null if the tree is empty', () => {
            const node = tree.min(null);
            expect(node).toBe(null);
        });
    });

    describe('successor', () => {
        let tree: BST<number>;
        let nodes: Node<number>[];
        beforeAll(() => {
            [tree, nodes] = createTestTree();
        });

        // it('should return a node\'s successor, when the node has the right child', () => {
        //     const node = nodes.find(findByKey(23));
        //     if (!node) throw new Error('Node not found');

        //     const successor = tree.successor(node);
        //     expect(successor).toBe(nodes.find(findByKey(33)));
        // });

        it('should return a node\'s successor, when the node doesn\'t have the right child', () => {
            const node = nodes.find(findByKey(18));
            if (!node) throw new Error('Node not found');

            const successor = tree.successor(node);
            expect(successor).toBe(nodes.find(findByKey(23)));
        });

        it('should return null, when the node is the maximum node', () => {
            const node = nodes.find(findByKey(42));
            if (!node) throw new Error('Node not found');

            const successor = tree.successor(node);
            expect(successor).toBe(null);
        });
    });

    describe('predecessor', () => {
        let tree: BST<number>;
        let nodes: Node<number>[];
        beforeAll(() => {
            [tree, nodes] = createTestTree();
        });

        it('should return a node\'s predecessor, when the node has the left child', () => {
            const node = nodes.find(findByKey(16));
            if (!node) throw new Error('Node not found');

            const predecessor = tree.predecessor(node);
            expect(predecessor).toBe(nodes.find(findByKey(15)));
        });

        it('should return a node\'s predecessor, when the node doesn\'t have the left child', () => {
            const node = nodes.find(findByKey(15));
            if (!node) throw new Error('Node not found');

            const predecessor = tree.predecessor(node);
            expect(predecessor).toBe(nodes.find(findByKey(8)));
        });

        it('should return null, when the node is the minimum node', () => {
            const node = nodes.find(findByKey(4));
            if (!node) throw new Error('Node not found');

            const predecessor = tree.predecessor(node);
            expect(predecessor).toBe(null);
        });
    });

    describe('_checkRI', () => {
        it('should return true, if representation invariant is valid', () => {
            const [tree] = createTestTree();
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

        it('should throw, if a node\'s left child has a wrong parent', () => {
            const tree = new BST();
            tree.insert(new Node(23, 23));
            tree.insert(new Node(8, 8));
            tree.insert(new Node(4, 4));
            tree.insert(new Node(16, 16));
            const brokenNode = new Node(15, 15);
            tree.insert(brokenNode);
            tree.insert(new Node(17, 17));
            tree.insert(new Node(18, 18));
            tree.insert(new Node(42, 42));
            tree.insert(new Node(33, 33));
            brokenNode.parent = null;

            expect(tree._checkRI.bind(tree)).toThrow();
        });

        it('should throw, if a node\'s right child has a wrong parent', () => {
            const tree = new BST();
            tree.insert(new Node(23, 23));
            tree.insert(new Node(8, 8));
            tree.insert(new Node(4, 4));
            tree.insert(new Node(16, 16));
            tree.insert(new Node(15, 15));
            const brokenNode = new Node(17, 17);
            tree.insert(brokenNode);
            tree.insert(new Node(18, 18));
            tree.insert(new Node(42, 42));
            tree.insert(new Node(33, 33));
            brokenNode.parent = null;

            expect(tree._checkRI.bind(tree)).toThrow();
        });
    });
});