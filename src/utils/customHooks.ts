import { useEffect, useState } from "react"

/**
 * @param state init state value
 * @param delay delay time ms
 * @returns debounced value
 */
const useDebounce = (state = "", delay = 500) => {
    const [debounced, setDebounced] = useState(state);
    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            setDebounced(state);
        }, delay);
        return () => {
            clearTimeout(idTimeOut);
        }
    }, [state]);
    return debounced;
}

export {
    useDebounce
}