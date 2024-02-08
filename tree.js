const Node = require("./node");

module.exports = class Tree {
  constructor(array) {
    this._array = array;
    this._root = null;
  }

  get root() {
    return this._root;
  }

  set root(newRoot) {
    this._root = newRoot;
  }

  insert(value, leaf = this._root) {
    if (value < leaf.val && leaf.left === null) {
      const newNode = new Node(value);
      leaf.left = newNode;
    }

    if (value > leaf.val && leaf.right === null) {
      const newNode = new Node(value);
      leaf.right = newNode;
    }

    if (value < leaf.val && leaf.left !== null) {
      return this.insert(value, leaf.next);
    } else if (value > leaf.val && leaf.right !== null) {
      return this.insert(value, leaf.right);
    }
  }

  delete(value, leaf = this._root) {
    // Choose left node
    if (value < leaf.val) {
      if (leaf.left) {
        if (
          leaf.left.val === value &&
          leaf.left.left === null &&
          leaf.left.right === null
        ) {
          leaf.left = null;
        } else if (
          leaf.left.val === value &&
          leaf.left.left === null &&
          leaf.left.right !== null
        ) {
          leaf.left = leaf.left.right;
        } else if (
          leaf.left.val === value &&
          leaf.left.left !== null &&
          leaf.left.right === null
        ) {
          leaf.left = leaf.left.left;
        } else if (  
            leaf.left.val === value &&
            leaf.left.left !== null &&
            leaf.left.right !== null){
                const leafLeftChild = leaf.left.left;
                const leafRightChild = leaf.left.right;
                leaf.left = this.findNext(leaf.left.right);
                leaf.left.right = leafRightChild;
                leaf.left.left = leafLeftChild
        } else {
          return this.delete(value, leaf.left);
        }
      } else {
        console.log("Node not found");
      }
    }

    // Choose right node
    if (value > leaf.val) {
      if (leaf.right) {
        if (
          leaf.right.val === value &&
          leaf.right.left === null &&
          leaf.right.right === null
        ) {
          leaf.right = null;
        } else if (
          leaf.right.val === value &&
          leaf.right.left === null &&
          leaf.right.right !== null
        ) {
          leaf.right = leaf.right.right;
        } else if (
          leaf.right.val === value &&
          leaf.right.left !== null &&
          leaf.right.right === null
        ) {
          leaf.right = leaf.right.left;
        } else if (  
            leaf.right.val === value &&
            leaf.right.left !== null &&
            leaf.right.right !== null){
                const leafLeftChild = leaf.right.left;
                const leafRightChild = leaf.right.right;
                leaf.right = this.findNext(leaf.right.right);
                leaf.right.right = leafRightChild;
                leaf.right.left = leafLeftChild
        } else {
          return this.delete(value, leaf.right);
        }
      } else {
        console.log("Node not found");
      }
    }
  }

  findNext(leaf) {

    if(leaf.left.left === null){
        let newChange = leaf.left;
        this.delete(leaf.left.val);
        return newChange;
    } else {
        return this.findNext(value, leaf.left)
    }
  }

  find(value, leaf = this._root) {
    if (leaf.val === value) {
      return leaf;
    }
    if (value < leaf.val) {
      if (leaf.left) {
        return this.find(value, leaf.left);
      } else {
        return "Value not found";
      }
    }

    if (value > leaf.val) {
      if (leaf.right) {
        return this.find(value, leaf.right);
      }
    } else {
      return "Value not found";
    }
  }

  levelOrder(callback){

  }

  height(node, currentNode=null, height){
  }

  depth(node, currentNode = this._root,depth=0){
    if(node.val === currentNode.val){
        return depth;
    }

    if(node.val > currentNode.val){
        return this.depth(node, currentNode.right, depth +1)
    }

    if(node.val < currentNode.val){
        return this.depth(node, currentNode.left, depth +1)
    }
  }

  isBalanced(){
  }

};
