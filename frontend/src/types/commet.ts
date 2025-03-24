export interface Commet {
  id: string;
  amount: number;
  salesperson: string;
  date: string;
  commission: number;
}

export interface CommetResponse {
  data: Commet[];
  formattedData: {
    table: Commet[];
    summary: {
      totalDeals: number;
      totalAmount: number;
      totalCommissions: number;
    }
  }
}
