export interface Payment {
    id: number; // ID de la reserva
    ammount: number;
    paymentDate: Date;
    cardNumber: number; 
    ca: number; 
    status: string; 
}



// private Long transactionId;
//     private double amount;
//     private LocalDateTime paymentDate;
//     private Integer cardNumber;
//     private String cardHolderName;
//     private Integer cardExpirationDate;
//     private Integer cardSecurityCode;