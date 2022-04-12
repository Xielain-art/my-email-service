import {useCallback} from "react";
import {toast} from "react-toastify";

export const useMessage = () => {
    return useCallback((text, type) => {
        toast[type](text, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [])
}