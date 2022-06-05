/**
 * A node that is used internally by Pages class
 */
class PageNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  getNext() {
    return this.next;
  }

  getData() {
    return this.data;
  }

  setNext(next) {
    this.next = next;
  }

  setData(data) {
    this.data = data;
  }
}

/**
 * A linked list that will be used for pagination
 */
export class Pages {
  length = 0;

  constructor() {
    this.head = null;
  }

  /**
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this.head === null;
  }

  insertHead(data) {
    const node = new PageNode(data);
    let temp = this.head;
    node.setNext(temp);
    this.head = node;
    this.length++;
  }

  /**
   *
   * @param {string} data
   */
  append(data) {
    this.length++;
    const node = new PageNode(data);

    if (this.head === null) {
      this.head = node;
      return;
    }

    let temp = this.head;
    while (temp.getNext() !== null) temp = temp.getNext();

    temp.setNext(node);
  }
  /**
   *
   * @param {string} data
   * @returns {PageNode | null}
   */
  find(data) {
    //
    let temp = this.head;
    if (temp.getData() === data) return temp;

    temp = temp.getNext();

    while (temp.getNext() !== null && temp.getData() !== data) {
      if (temp.getData() === data) return temp;
      temp = temp.getNext();
    }

    return null;
  }

  /**
   *
   * @param {string} data
   * @returns {PageNode | null}
   */
  remove(data) {
    if (this.head === null) return null;
    let node1 = this.head,
      node2 = this.head.getNext();

    if (node1.getData() === data) {
      this.head = node2;
      return node1;
    }

    do {
      if (node2.getData() === data) {
        node1.setNext(node2.getNext());
        this.length--;
        return node2;
      }
      node1 = node2;
      node2 = node2.getNext();
    } while (node2 !== null);

    return null;
  }

  /**
   *
   * @param {int} index
   * @returns {PageNode | null}
   */
  getAtIndex(index) {
    if (index >= this.length) return null;
    let localIdx = 0;
    let node = this.head;
    while (localIdx < this.length) {
      if (localIdx === index) {
        return node;
      }
      node = node.getNext();
      localIdx++;
    }
    return null;
  }

  /**
   *
   * @param {int} index
   * @returns {PageNode | null}
   */
  removeAtIndex(index) {
    if (index >= this.length) return null;

    let node1 = this.head,
      node2 = this.head.getNext();

    if (index === 0) {
      this.head = node2;
      return node1;
    }

    let localIndex = 1;

    while (localIndex < this.length) {
      if (localIndex === index) {
        node1.setNext(node2.getNext());
        this.length--;
        return node2;
      }
      node1 = node2;
      node2 = node2.getNext();
      localIndex++;
    }
    return null;
  }

  /**
   *
   * @param {any[]} items Array of items to append to the end of this list
   */
  fromIter(items) {
    for (let item of items) {
      this.append(item);
    }
  }

  display() {
    if (this.head === null) return;
    const output = [];
    let node = this.head;
    let idx = 0;
    while (node !== null) {
      output.push(`( [index:${idx}] - [data:${node.getData()}])`);
      node = node.getNext();
      idx++;
    }
    return output.join(" -> ");
  }
}
