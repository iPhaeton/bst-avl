import { Node } from 'src/Node';

describe('Node', () => {
    describe('constructor', () => {
        it('should create a node with a key and value', () => {
            const value = {};
            const node = new Node(3, value);

            expect(node.key).toBe(3);
            expect(node.value).toBe(value);
            expect(node.parent).toBe(null);
            expect(node.left).toBe(null);
            expect(node.right).toBe(null);
        });
    });
        
    describe('_checkRI', () => {
        it('should compare node with its ancestors and predecessors and return true, if comparison is correct', () => {
            const node = new Node(6, 6);
            const ancestors = [new Node(3, 3), new Node(5, 5)];
            const successors = [new Node(7, 7), new Node(10, 10)];

            expect(node._checkRI(ancestors, successors)).toBe(true);
        });

        it('should throw, if comparison with ancestors is incorrect', () => {
            const node = new Node(6, 6);
            const ancestors = [new Node(3, 3), new Node(8, 8)];
            const successors = [new Node(7, 7), new Node(10, 10)];

            expect(() => node._checkRI(ancestors, successors)).toThrow();
        });

        it('should throw, if comparison with successors is incorrect', () => {
            const node = new Node(6, 6);
            const ancestors = [new Node(3, 3), new Node(5, 5)];
            const successors = [new Node(4, 4), new Node(10, 10)];

            expect(() => node._checkRI(ancestors, successors)).toThrow();
        });

        it('should throw, if left child\'s parent is not the node', () => {
            const node = new Node(6, 6);
            node.left = new Node(5, 5);

            expect(() => node._checkRI([], [])).toThrow();
        });

        it('should throw, if right child\'s parent is not the node', () => {
            const node = new Node(6, 6);
            node.right = new Node(7, 7);

            expect(() => node._checkRI([], [])).toThrow();
        });

        it('should call children\'s _checkRI methods', () => {
            const node = new Node(6, 6);
            const leftChild = new Node(1, 1);
            leftChild.parent = node;
            node.left = leftChild;
            const rightChild = new Node(15, 15);
            rightChild.parent = node;
            node.right = rightChild;
            leftChild._checkRI = jest.fn(() => true);
            rightChild._checkRI = jest.fn(() => true);

            const ancestors = [new Node(3, 3), new Node(5, 5)];
            const successors = [new Node(7, 7), new Node(10, 10)];

            node._checkRI(ancestors, successors);

            expect((leftChild._checkRI as jest.Mock).mock.calls[0][0]).toEqual(ancestors);
            expect((leftChild._checkRI as jest.Mock).mock.calls[0][1]).toEqual([...successors, node]);
            expect((rightChild._checkRI as jest.Mock).mock.calls[0][0]).toEqual([...ancestors, node]);
            expect((rightChild._checkRI as jest.Mock).mock.calls[0][1]).toEqual(successors);
        });
    });
});