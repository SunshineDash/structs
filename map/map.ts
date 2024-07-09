import { IMap } from './map.interface';
import { TMap } from './map.type';

export class Map<T> implements IMap<T> {
    entries: TMap<T> = {};

    constructor(map?: TMap<T>) {
        this.entries = map ?? {};
    }

    clear(): void {
        this.entries = {};
    }

    contains(value: T): boolean {
        const values = Object.values(this.entries);

        return values.indexOf(value) !== -1;
    }

    copy(): Map<T> {
        const entries = Object.entries(this.entries);
        if (entries.length) {
            return new Map<T>();
        }

        return new Map<T>(Object.fromEntries(entries) as TMap<T>);
    }

    deleteByKey(key: string | number): void {
        delete this.entries[key];
    }

    deleteByValue(value: T): void {
        for (let i in this.entries) {
            if (this.entries[i] === value) {
                delete this.entries[i];
            }
        }
    }

    deleteFirstElement(): void {
        const keys = Object.keys(this.entries);
        if (keys.length !== 0) {
            delete this.entries[keys[0]];
        }
    }

    deleteLastElement(): void {
        const keys = Object.keys(this.entries);
        if (keys.length !== 0) {
            delete this.entries[keys[keys.length - 1]];
        }
    }

    equals(map: Map<T>): boolean {
        const keys = Object.keys(this.entries);
        const comparedKeys = Object.keys(map.entries);

        if (keys.length === 0 || comparedKeys.length === 0) {
            return keys.length === comparedKeys.length;
        }

        if (keys.length !== comparedKeys.length) {
            return false;
        }

        for (let i = 0; i < keys.length; i++) {
            if (!keys[i] || !comparedKeys[i] || keys[i] !== comparedKeys[i]
                || !map.entries[keys[i]] || map.entries[keys[i]] !== this.entries[keys[i]]) {
                return false;
            }
        }

        return true;
    }

    filter(comparator: (data: T) => boolean): Map<T> {
        const entries = Object.entries(this.entries);
        if (entries.length === 0) {
            return new Map<T>();
        }

        const keys = Object.keys(this.entries);
        const newEntries:[string | number, T][] = [];
        for (let key in keys) {
            if (comparator(entries[key][1])) {
                newEntries.push([key, entries[key][1]]);
            }
        }

        return new Map<T>(Object.fromEntries(newEntries) as TMap<T>);
    }

    insertAtEnd(key: string | number, data: T): void {
        this.entries[key] = data;
    }

    insertInBegin(key: string | number, data: T): void {
        const entries: [string | number, T][] = Object.entries(this.entries);
        entries.splice(0, 0, [key, data]);
        this.entries = Object.fromEntries(entries);
    }

    sortByKey(): void {
        let entries = Object.entries(this.entries);
        if (!entries.length) {
            return;
        }

        entries = entries.sort((n1,n2) => {
            if (n1[0] > n2[0]) {
                return 1;
            }

            if (n1[0] < n2[0]) {
                return -1;
            }

            return 0;
        });

        this.entries = Object.fromEntries(entries);
    }
}