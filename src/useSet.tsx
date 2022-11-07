import React from 'react'

export default function useSet(interator) {
    const set = new Set(interator)

    const methods = {
        add: set.add,
        addAll: set.allAll
    }
    return [
        set,
        methods
    ]
}
