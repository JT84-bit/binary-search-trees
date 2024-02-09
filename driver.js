const Tree = require("./tree");

let randomNumbers = Array(20).fill().map(() => Math.round(Math.random() * 100));
let highNumbers = Array(5).fill().map(() => Math.round(Math.random() * 100 + 100));
highNumbers = highNumbers.sort((a, b ) => a - b); 

const newTree = new Tree();
newTree.buildTree(randomNumbers)
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
for(let i = 0; i < highNumbers.length;i++){
    newTree.insert(highNumbers[i])
}
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());

