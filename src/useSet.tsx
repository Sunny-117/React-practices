import React from 'react'

export default function useSet(interator) {
    const set = new Set(interator)

    const methods = {
        add(item: T): void;
        addAll(items: Iterable<T>): void;
        delete(item: T): void;
        deleteAll(items: Iterable<T>): void;
        clear(): void;
    }

    return [
        set,
        methods
    ]
}
