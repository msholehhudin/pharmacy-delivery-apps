import { Transaction } from "@/types/transactions"

export const mapTransaction =(row:any): Transaction => {
    return {
        id: row.id,
        patientName: row.patient_name,
        patientAddress: row.patient_address,
        patientPhone: row.patient_phone,
        status: row.status,
        medicineItems: row.prescription_detais,
        courier: row.courier_id,
        amount: row.total_amount,
        createdBy: row.created_by,
        transactionDate: row.created_at,
        notes: row.notes,
        paymentMethod: row.payment_method,
        prescriptionDetails: row.prescription_details,
        type: row.type,
        courierName: row.courierName,
        prescriptionCode: row.prescription_code
        // fee: 10% * row.total_amount 
    }
} 