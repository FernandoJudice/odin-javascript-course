function HashMap() {
    this.loadFactor = 0.8;
    this.capacity = 2;
    this.buckets = new Array(this.capacity);

    this.hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        }
        return hashCode;
    }

    this.grow = () => {
        const newCapacity = 2*this.capacity;
        const entries = this.entries();
        this.clear();
        this.capacity = newCapacity;
        this.buckets.length = newCapacity;
        for (let entry of entries) {
            this.set(entry[0],entry[1])
        }
    }

    this.set = (key,value) => {

        if ((this.capacity*this.loadFactor) < this.length() ) {this.grow()}

        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        
        if(!this.buckets[index]) {
            this.buckets[index] = new LinkedList()
        }

        this.buckets[index].append(key,value)
    }

    this.get = (key) => {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.buckets[index]) {
            return null
        }

        const node = this.buckets[index].findKey(key)
        return node ? node.value : null
    }

    this.has = (key) => {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.buckets[index]) {
            return false
        }

        return this.buckets[index].findKey(key) ? true : false
    }

    this.remove = (key) => {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.buckets[index]) {
            return false
        }

        return this.buckets[index].remove(key)
    }

    this.length = () => {
        let count = 0;
        for (let bucket of this.buckets) {
            if (!bucket) {continue}
            count += bucket.size()
        }
        return count
    }

    this.clear = () => {
        this.capacity = 2;
        this.buckets.splice(0);
        this.buckets.length = this.capacity
    }

    this.keys = () => {
        const keys = []
        for (let bucket of this.buckets) {
            if (!bucket) {continue}
            keys.push(...bucket.getKeys())
        }
        return keys
    }

    this.values = () => {
        const values = []
        for (let bucket of this.buckets) {
            if (!bucket) {continue}
            values.push(...bucket.getValues())
        }
        return values
    }

    this.entries = () => {
        const entries = []
        for (let bucket of this.buckets) {
            if (!bucket) {continue}
            entries.push(...bucket.getEntries())
        }
        return entries
    }
}

function LinkedList() {
    this.head = null

    this.append = (key,value) => {
        
        function checkNode(node,key,value) {
            if (node.key === key) {
                node.value = value
                return
            }
            if (!node.nextNode) {
                node.nextNode = new Node(key,value);
                return
            }
            return checkNode(node.nextNode,key,value)
        }
        if(!this.head) {
            this.head = new Node(key,value)
        } else {
            checkNode(this.head,key,value);
        }
    }

    this.findKey = (key) => {
        function _findKey(node,key) {
            if(!node) {
                return null
            }
            if (node.key === key) {
                return node
            }
            if (!node.nextNode) {
                return null
            }
            return _findKey(node.nextNode,key)
        }
        return _findKey(this.head,key)
    }

    this.remove = (key) => {
        function _remove(node,key) {
            if (!node.nextNode) {return false}
            if (node.nextNode.key == key) {
                node.nextNode = node.nextNode.nextNode
                return true
            }
            return _remove(node.nextNode,key)
        }
        if (!this.head) {return false}
        if (this.head.key === key) {
            this.head = this.head.nextNode
            return true
        }
        return _remove(this.head,key)
    }

    this.size = () => {
        function countNode(node, count) {
            if (!node) {
                return count;
            }    
            return countNode(node.nextNode,++count)
        }    
        return countNode(this.head, 0)
    }

    this.getKeys = () => {
        const keys = [];
        curNode = this.head;
        while (curNode) {
            keys.push(curNode.key)
            curNode = curNode.nextNode;
        }
        return keys
    }

    this.getValues = () => {
        const values = [];
        curNode = this.head;
        while (curNode) {
            values.push(curNode.value)
            curNode = curNode.nextNode;
        }
        return values
    }

    this.getEntries = () => {
        const Entries = [];
        curNode = this.head;
        while (curNode) {
            Entries.push([curNode.key, curNode.value])
            curNode = curNode.nextNode;
        }
        return Entries
    }
}

function Node(key,value,nextNode) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
}

// const list = new LinkedList();
// console.log(list.head)
// list.append('carlos','uchoa');
// list.append('maria','betania');
// console.log(list.head)
// list.append('carlos','tavares');
// console.log(list.head)

const map = new HashMap();
console.log(map.buckets)
map.set('carlos','uchoa');
map.set('maria','betania');
console.log(map.buckets)
map.set('carlos','tavares');
console.log(map.buckets)
// console.log(map.length())
// console.log(map.clear())
// console.log(map.buckets)
console.log(map.keys())
console.log(map.values())
console.log(map.entries())
// map.grow()
map.set('rogerio','tavares');
map.set('mateus','tavares');
map.set('silvia','tavares');
map.set('tiberio','tavares');
console.log(map.buckets)