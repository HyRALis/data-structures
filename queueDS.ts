import LinkedList from "./linkedList";

export default class Queue<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList();
  }

  size(): number {
    return this.list.size();
  }
  isEmpty(): boolean {
    return this.list.isEmpty();
  }
  enQueue(value: T): void {
    this.list.addBack(value);
  }
  deQueue(): void {
    this.list.deleteFront();
  }
  getFirst(): T {
    return this.list.getFront();
  }
  [Symbol.iterator](): Iterator<T> {
    this.list[Symbol.iterator];
  }
}
