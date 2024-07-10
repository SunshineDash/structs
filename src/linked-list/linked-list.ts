import { Node } from './node.model';
import { ILinkedList } from './linked-list.interface';

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null = null;

    clear(): void {
        this.head = null;
    }

    contains(value: T): boolean {
        const contains = (node: Node<T>, value: T): boolean => {
            if (node.value === value) {
                return true;
            }

            return node.next ? contains(node.next, value) : false;
        };

        return this.head ? contains(this.head, value) : false;
    }

    copy(): LinkedList<T> {
        const copyNodesToNewArray = (node: Node<T>, list: LinkedList<T>): LinkedList<T> => {
            list.insertAtEnd(node.value);

            return node.next ? copyNodesToNewArray(node.next, list) : list;
        };

        return this.head ? copyNodesToNewArray(this.head, new LinkedList<T>()) : new LinkedList<T>;
    }

    deleteFirstNode(): void {
        if (this.head) {
            this.head = this.head.next;
        }
    }

    deleteLastNode(): void {
        if (!this.head) {
            return;
        }

        const getPreLastNode = (node: Node<T>): Node<T> => {
            if (!node.next || node.next && !node.next.next) {
                return node;
            }

            return getPreLastNode(node.next)
        };
        const preLast = getPreLastNode(this.head);
        preLast.next = null;
    }

    equals(list: LinkedList<T>): boolean {
        if (!this.head || !list.head) {
            return !this.head && !list.head;
        }

        const compareNodes = (firstNode: Node<T>, secondNode: Node<T>): boolean => {
            if (firstNode.value !== secondNode.value) {
                return false;
            }

            if (firstNode.next && secondNode.next) {
                return compareNodes(firstNode.next, secondNode.next);
            }

            return !(firstNode.next || secondNode.next);
        };

        return compareNodes(this.head, list.head);
    }

    filter(comparator: (value: T) => boolean): LinkedList<T> {
        const filter = (node: Node<T>, list: LinkedList<T>): LinkedList<T> => {
            if (comparator(node.value)) {
                list.insertAtEnd(node.value);
            }

            return node.next ? filter(node.next, list) : list;
        };

        return this.head ? filter(this.head, new LinkedList<T>()) : new LinkedList<T>();
    }

    insertAtEnd(data: T): void {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        } else {
            const getLast = (node: Node<T>): Node<T> => {
                return node.next ? getLast(node.next) : node;
            };

            const lastNode = getLast(this.head);
            lastNode.next = node;
        }
    }

    insertInBegin(data: T): void {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    traverse(): T[] {
        const array: T[] = [];
        if (!this.head) {
            return array;
        }

        const addToArray = (node: Node<T>): T[] => {
            array.push(node.value);
            return node.next ? addToArray(node.next) : array;
        };

        return addToArray(this.head);
    }
}
