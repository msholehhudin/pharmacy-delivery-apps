"use client"

import { useState } from "react"

const useTransactionFilters = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const updateSeacrh = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const updateStatus = (value: string) => {
        setStatusFilter(value)
        setPage(1)
    }

    const updatePageSize = (value: number) => {
        setPageSize(value)
        setPage(1)
    }
        
    return {
        page,
        setPage,
        pageSize,
        setPageSize: updatePageSize,
        search,
        setSearch: updateSeacrh,
        statusFilter,
        setStatusFilter: updateStatus
    }
}

export default useTransactionFilters