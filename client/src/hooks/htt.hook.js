import {useCallback, useState} from "react";

export const useHttp = () => {
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const request = useCallback(async (e, body = null) => {
        setLoading(true)
        try {
            const data = await e(body)
            return data
        } catch (e) {
            setErrors(e.response.data.errors)
            throw e
        } finally {
            setLoading(false)
        }
    }, [])
    const clearError = useCallback(() => setErrors(null), [])
    return [request, errors, clearError, loading]
}