import { BST } from "./trees/BST";
import { Node } from "./nodes/Node";
import { Plotter } from "./Plotter";

const plotter = new Plotter();
const tree = new BST();

tree.insert(new Node(23, 23));
tree.insert(new Node(8, 8));
tree.insert(new Node(4, 4));
tree.insert(new Node(16, 16));
tree.insert(new Node(14, 14));
tree.insert(new Node(15, 15));
tree.insert(new Node(18, 18));
tree.insert(new Node(17, 17));
tree.insert(new Node(42, 42));
tree.insert(new Node(33, 33));
tree.insert(new Node(44, 44));
plotter.plot(tree);

console.log('--------------------------------------------------------------------------------------------------------------------------------')
const node = tree.find(16);
tree.delete(node as Node<number>);
console.log(tree._checkRI());
plotter.plot(tree);