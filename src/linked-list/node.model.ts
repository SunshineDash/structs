export class Node<T> {
    public next: Node<T> | null = null;

    constructor(public value: T) {
    }
}