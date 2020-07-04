import LinkedList from "./linkedList";

export default class Stack<T> implements Iterable<T> {
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
  push(value: T): void {
    this.list.addBack(value);
  }
  pop(): void {
    this.list.deleteBack();
  }
  clear(): void {
    this.list.clear();
  }
  getLast(): T {
    return this.list.getBack();
  }
  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}
