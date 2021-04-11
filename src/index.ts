import { BST } from "./BST";
import { Node } from "./Node";

const tree = new BST();

tree.insert(new Node(2, 2));
tree.insert(new Node(1, 1));
tree.insert(new Node(3, 3));
tree.plot();