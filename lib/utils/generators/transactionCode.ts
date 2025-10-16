export const generateTransactionCode = (prefix = 'TX') => {
    const date = new Date()

    const formatDate = date 
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "")

    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}-${formatDate}-${randomPart}`
}