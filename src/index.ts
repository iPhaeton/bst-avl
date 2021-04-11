import { BST } from "./BST";
import { Node } from "./Node";
import { getH } from "./utils";

const tree = new BST();

tree.insert(new Node(23, 23))
tree.insert(new Node(8, 8));
tree.insert(new Node(4, 4));
tree.insert(new Node(16, 16));
tree.insert(new Node(15, 15));
tree.insert(new Node(17, 17));
tree.insert(new Node(42, 42));
tree.plot();