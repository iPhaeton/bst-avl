# bst-avl

Balanced binary search tree (AVL implementation)

## Installation

```bash
npm install bst-avl
```

## Usage
```js
import { AVL } from 'bst-avl';

//Create a tree
const tree = new AVL();

// Create some nodes
// 1st parameter is a number key, second parameter is a value, may be of any type
const node1 = new AVLNode(1, 'val1');
const node2 = new AVLNode(2, 'val2');
const node3 = new AVLNode(3, 'val3');

// Insert nodes into the tree
tree.insert(node1);
tree.insert(node2);
tree.insert(node3);

// Find the node by key
const node = tree.find(2);

//Find the node with the maximum or minimum key
const maxNode = tree.max();
const minNode = tree.min();

// Get a node's successor and predecessor
const nextNode = tree.successor(node2);
const prevNode = tree.predecessor(node2);

// Delete a node
tree.delete(node2);
```
