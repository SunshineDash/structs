import { Map } from './map';

export interface IMap<T> {
    clear(): void;
    contains(value: T): boolean;
    copy(): Map<T>;
    deleteByKey(key: string | number): void;
    deleteByValue(value: T): void;
    deleteFirstElement(): void;
    deleteLastElement(): void;
    equals(map: Map<T>): boolean;
    filter(comparator: (data: T) => boolean): Map<T>;
    insertAtEnd(key: string | number, data: T): void;
    insertInBegin(key: string | number, data: T): void;
    sortByKey(): void;
}
