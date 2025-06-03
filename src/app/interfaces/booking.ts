export interface Booking {
    id?: number; // ID de la reserva
    propertyId: number;
    tenantId: number;
    startDate: string;  
    endDate: string;   
    totalPrice: number; 
    status: string; 
    state: string; 
}