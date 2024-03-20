export interface Invoice {
    id: number;
    first_name: string;
    last_name: string;
    bill_add: string;
    bill_city: string;
    card_num: number;
    exp_date: string;
    amount: number;
    event_id: number
}


// private Long id;
//     private String first_name;
//     private String last_name;
//     private String bill_add; // bill address
//     private String bill_city;
//     private String bill_state;
//     private Long card_num;
//     private String exp_date;
// 	private Double amount;
//     @Column(nullable = false, updatable = false)
// 	private int event_id;