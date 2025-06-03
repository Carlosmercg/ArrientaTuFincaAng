export interface Property {
    id?: number;
    description: string;
    address: string; 
    title: string; 
    city: string; 
    country: string; 
    imageUrl: string; 
    price: number;
    bathrooms: number;
    bedrooms: number;
    rating: number[];
    landlordId: number;
}
 