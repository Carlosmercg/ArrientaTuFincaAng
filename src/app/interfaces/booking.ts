export interface Booking {
    id?: number; // ID de la reserva
    propertyId: number;
    startDate: Date;
    endDate: Date; 
    totalPrice: number; 
    status: string; 
}