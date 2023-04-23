export interface ITransaction {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
}
