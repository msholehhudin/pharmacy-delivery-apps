import {format} from 'date-fns'
export const formatDateTime = (dateString:string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm')
}