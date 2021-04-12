import { Node } from '../Node';

describe('Node', () => {
    describe('_checkRI', () => {
        it('should compare node with its ancestors and predecessors and return true, if comparison is correct', () => {
            const node = new Node(6, 6);
            const ancestors = [new Node(3, 3), new Node(5, 5)];
            const successors = [new Node(7, 7), new Node(10, 10)];

            expect(node._checkRI(ancestors, successors)).toBe(true);
        });
    });
});