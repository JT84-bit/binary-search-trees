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

  // Builds new tree from array
buildTree(newArray) {
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
    this._root = root;
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
    const queue = [this._root];
    const queue2 = [];

    if(!callback){
        
        while(queue.length > 0){
            const leftChild = queue[0].left;
            const rightChild = queue[0].right;
            if(leftChild){
                queue.push(leftChild);
            }
    
            if(rightChild){
                queue.push(rightChild);
            }
            const newValue = queue.shift()
            queue2.push(newValue.val);
        };
        
        return queue2;
    }

    while(queue.length > 0){
        const leftChild = queue[0].left;
        const rightChild = queue[0].right;
        if(leftChild){
            queue.push(leftChild);
        }

        if(rightChild){
            queue.push(rightChild);
        }

        callback(queue.shift());
    }
  }

  inOrder(callback){
    const queue = [this._root.left];
    const queue2 = [];
    let leftSide = true;

    if(!callback){
        while(queue.length > 0){
            const leftChild = queue[0].left;
            const rightChild = queue[0].right;
            if(leftChild){
                queue.push(leftChild);
            }
    
            if(rightChild){
                queue.push(rightChild);
            }
            const newValue = queue.shift()
            queue2.push(newValue.val);
    
            if(!queue.length && leftSide){
                queue2.push(this._root.val)
                queue.push(this._root.right)
                leftSide = false;
            }
        } 
        return queue2;
    }

    while(queue.length > 0){
        const leftChild = queue[0].left;
        const rightChild = queue[0].right;
        if(leftChild){
            queue.push(leftChild);
        }

        if(rightChild){
            queue.push(rightChild);
        }

        callback(queue.shift());

        if(!queue.length && leftSide){
            callback(this._root)
            queue.push(this._root.right)
            leftSide = false;
        }
    }
  }

  preOrder(callback){
    const queue = [this._root.left];
    const queue2 = [this._root.val];
    let leftSide = true;

    if(!callback){
        while(queue.length > 0){
            const leftChild = queue[0].left;
            const rightChild = queue[0].right;
            if(leftChild){
                queue.push(leftChild);
            }
    
            if(rightChild){
                queue.push(rightChild);
            }
            const newValue = queue.shift()
            queue2.push(newValue.val);
    
            if(!queue.length && leftSide){
                queue.push(this._root.right)
                leftSide = false;
            }
        } 
        return queue2;
    }
    callback(this._root)
    while(queue.length > 0){
        const leftChild = queue[0].left;
        const rightChild = queue[0].right;
        
        if(leftChild){
            queue.push(leftChild);
        }

        if(rightChild){
            queue.push(rightChild);
        }

        callback(queue.shift());

        if(!queue.length && leftSide){
            queue.push(this._root.right)
            leftSide = false;
        }
    }
  }

  postOrder(callback){
    const queue = [this._root.left];
    const queue2 = [];
    let leftSide = true;

    if(!callback){
        while(queue.length > 0){
            const leftChild = queue[0].left;
            const rightChild = queue[0].right;
            if(leftChild){
                queue.push(leftChild);
            }
    
            if(rightChild){
                queue.push(rightChild);
            }
            const newValue = queue.shift()
            queue2.push(newValue.val);
    
            if(!queue.length && leftSide){
                queue.push(this._root.right)
                leftSide = false;
            }
        } 
        queue2.push(this._root.val)
        return queue2;
    }
    
    while(queue.length > 0){
        const leftChild = queue[0].left;
        const rightChild = queue[0].right;
        
        if(leftChild){
            queue.push(leftChild);
        }

        if(rightChild){
            queue.push(rightChild);
        }

        callback(queue.shift());

        if(!queue.length && leftSide){
            queue.push(this._root.right)
            leftSide = false;
        }
    }
    callback(this._root)
  }

  height(node, height=0){
    if(!node){
        return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right)

    return Math.max(leftHeight, rightHeight)+1;
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
    if(this.height(this._root.left) === this.height(this._root.right)){
        return true
    }
    return false;
  }

  rebalance(){
    const newList = this.inOrder();
    this.buildTree(newList);
 };
 

};


