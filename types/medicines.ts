export interface Medicines {
    id:string
    name: string
    dosage: string
    quantity: string
    price: number
    instructions?: string
}

export interface MedicineFormData {
    name: string
    dosage: string
    quantity: string
    price: string
    instructions?: string
}