import { LinkedList } from './linked-list';

export interface ILinkedList<T> {
    clear(): void;
    contains(value: T): boolean;
    copy(): LinkedList<T>;
    deleteFirstNode(): void;
    deleteLastNode(): void;
    equals(list: LinkedList<T>): boolean;
    filter(comparator: (data: T) => boolean): LinkedList<T>;
    insertAtEnd(data: T): void;
    insertInBegin(data: T): void;
    traverse(): T[];
}
