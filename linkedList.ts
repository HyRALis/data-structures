class LinkedListNode<T> {
  value: T;
  nextNode: LinkedListNode<T> | null;
  prevNode: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.nextNode = null;
    this.prevNode = null;
  }
}
interface List<T> {
  head: LinkedListNode<T>;
  tail: LinkedListNode<T>;
  size: number;
}

export default class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined;

  constructor() {
    this.list = undefined;
  }

  //******METHODS******
  size(): number {
    if (this.list) {
      return this.list.size;
    } else return 0;
  }

  isEmpty(): boolean {
    if (this.list) return false;
    else return true;
  }

  //*********************ADD ELEMENT************************
  addFront(value: T): void {
    const newNode = new LinkedListNode(value);

    if (this.list) {
      this.list.head.prevNode = newNode;
      newNode.nextNode = this.list.head;
      this.list.head = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }
  addBack(value: T): void {
    const newNode = new LinkedListNode(value);

    if (this.list) {
      this.list.tail.nextNode = newNode;
      newNode.prevNode = this.list.tail;
      this.list.tail = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }
  addAt(index: number, value: T) {
    const newNode = new LinkedListNode(value);
    if (this.list) {
      if (index < 0 || index > this.list.size + 1) {
        throw new Error(
          `Please specify and index between 0 and ${this.size() + 1}`
        );
      }
      if (index === 1) {
        this.addFront(value);
        return;
      }
      if (index === this.list.size + 1) {
        this.addBack(value);
        return;
      }
      let current: LinkedListNode<T>;
      if (this.size() / 2 <= index) {
        current = this.list.head;
        for (let i: number = 1; i < index; i++) {
          current = current.nextNode!;
        }
        current.nextNode!.prevNode = newNode;
        current.nextNode!.prevNode.nextNode = current.nextNode;

        current.nextNode = newNode;
        current.nextNode.prevNode = current;

        this.list.size += 1;
      } else {
        current = this.list.tail;
        for (let i: number = this.size(); i >= index; i--) {
          current = current.prevNode!;
        }
        current.prevNode!.nextNode = newNode;
        current.prevNode!.nextNode.prevNode = current.prevNode;

        current.prevNode = newNode;
        current.prevNode.nextNode = current;

        this.list.size += 1;
      }
    }
  }

  //*********************GET ELEMENT*************************
  getFront(): T {
    if (!this.list) {
      throw new Error("Cannot get element of and empty list");
    }
    return this.list.head.value;
  }
  getBack(): T {
    if (!this.list) {
      throw new Error("Cannot get element of and empty list");
    }
    return this.list.tail.value;
  }
  getElement(index: number): T {
    if (!this.list) {
      throw new Error("Cannot get element of and empty list");
    }
    if (index < 0 || index > this.size()) {
      throw new Error(`Please specify and index between 0 and ${this.size()}`);
    }
    if (index === 1) {
      return this.getFront();
    }
    if (index === this.size()) {
      return this.getBack();
    }
    let current: LinkedListNode<T> = this.list.head;
    for (let i: number = 1; i < index; i++) {
      current = current.nextNode!;
    }
    return current.value;
  }

  //******************DELETE ELEMENT***********************
  deleteFront(): void {
    if (!this.list) {
      throw new Error("Cannot delete element of an empty list");
    } else if (this.list.size > 1) {
      this.list.head.nextNode!.prevNode = null;
      this.list.head = this.list.head.nextNode!;
      this.list.size -= 1;
    } else {
      delete this.list.head;
      delete this.list.tail;
      this.list.size = 0;
    }
  }
  deleteBack(): void {
    if (!this.list) {
      throw new Error("Cannot delete element of an empty list");
    } else if (this.list.size > 1) {
      this.list.tail.prevNode!.nextNode = null;
      this.list.tail = this.list.tail.prevNode!;
      this.list.size -= 1;
    } else {
      delete this.list.head;
      delete this.list.tail;
      delete this.list.size;
    }
  }
  clear(): void {
    delete this.list;
  }
  //****************** ITERATIONS! *************************
  fromArray(array: T[]) {
    for (const value of array) {
      this.addBack(value);
    }
    return this;
  }

  *[Symbol.iterator](): Iterator<T> {
    if (!this.list) {
      throw new Error("Cannot get element of and empty list");
    }

    let current: LinkedListNode<T> | null;

    for (
      current = this.list.head;
      current != null;
      current = current.nextNode
    ) {
      yield current.value;
    }
  }
}
