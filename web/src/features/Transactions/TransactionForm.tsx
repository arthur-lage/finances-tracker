import { useBalance } from "../../hooks/useBalance";
import { useTransactions } from "../../hooks/useTransactions";
import { transactionService } from "../../services/transactionService";

import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
};

export function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset: resetFormInputs,
    formState: { errors },
  } = useForm<Inputs>();

  const { transactions, setTransactions } = useTransactions();
  const { updateBalance } = useBalance();

  async function handleCreateForm({ name, type, value, date }: Inputs) {
    try {
      const { transaction } = await transactionService.create({
        name,
        type,
        value: Number(value),
        date,
      });

      resetFormInputs();

      const newTransactions = [transaction, ...transactions];

      setTransactions(newTransactions);
      await updateBalance();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateForm)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            placeholder="Name"
          />
          {errors.name && "This field is required"}
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select {...register("type", { required: true })} id="type">
            <option defaultChecked value="INCOME">
              Income
            </option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="value">Value</label>
          <input
            {...register("value", { required: true })}
            type="number"
            id="value"
            placeholder="Value"
          />
          {errors.value && "This field is required"}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            {...register("date", { required: true })}
            type="date"
            id="date"
            placeholder="Date"
          />
          {errors.date && "This field is required"}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
