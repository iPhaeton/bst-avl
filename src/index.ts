import { BST } from "./BST";
import { Node } from "./Node";

const tree = new BST();

tree.insert(new Node(23, 23))
tree.insert(new Node(8, 8));
tree.insert(new Node(4, 4));
tree.insert(new Node(16, 16));
tree.insert(new Node(15, 15));
tree.insert(new Node(17, 17));
tree.insert(new Node(18, 18));
tree.insert(new Node(42, 42));
tree.insert(new Node(33, 33));
tree.plot();
console.log(tree._checkRI());