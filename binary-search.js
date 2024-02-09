const Tree = require("./tree");
const Node = require("./node");

// Builds new tree from array
function buildTree(newArray) {
  if (newArray.length === 0) {
    return null;
  }

  newArray = newArray.filter(
    (value, index) => newArray.indexOf(value) === index
  ); 
  newArray = newArray.sort((a, b ) => a - b); 

  const mid = Math.floor(newArray.length / 2);
  const root = new Node(newArray[mid]);

  // initializing queue
  const q = [
    [root, [0, mid - 1]],
    [root, [mid + 1, newArray.length - 1]],
  ];

  while (q.length > 0) {
    const [parent, [left, right]] = q.shift();

    // if there are elements to process and parent node is not NULL
    if (left <= right && parent != null) {
      const mid = Math.floor((left + right) / 2);
      const child = new Node(newArray[mid]);

      // set the child node as left or right child of the parent node
      if (newArray[mid] < parent.val) {
        parent.left = child;
      } else {
        parent.right = child;
      }

      // push the left and right child and their indices to the queue
      q.push([child, [left, mid - 1]]);
      q.push([child, [mid + 1, right]]);
    }
  }
  return root;
}

let trialArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let balancedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15 ,16, 17];

const treeRoot = buildTree(balancedArray);
const newTree = new Tree();
newTree.root = treeRoot;
//
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// <<<<<------>>>>

const printValue = (node) => {
    console.log(node.val)
}

newTree.postOrder(printValue);
console.log(newTree.postOrder());
prettyPrint(newTree.root);




