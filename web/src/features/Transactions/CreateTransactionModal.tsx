import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { transactionService } from "../../services/transactionService";
import { useTransactions } from "../../hooks/useTransactions";
import { useBalance } from "../../hooks/useBalance";
import { useForm } from "react-hook-form";

type CreateTransactionModalType = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
};

export function CreateTransactionModal({
  isOpen,
  onClose,
}: CreateTransactionModalType) {
  const { setTransactions, transactions } = useTransactions();
  const { updateBalance } = useBalance();

  const {
    register,
    handleSubmit,
    reset: resetFormInputs,
    formState: { errors },
  } = useForm<Inputs>();

  async function handleCreateTransaction({ name, type, value, date }: Inputs) {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Transaction</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <ModalBody>
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register("name", {
                  required: true,
                })}
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
                defaultValue={new Date().toISOString().substring(0, 10)}
              />
              {errors.date && "This field is required"}
            </div>
          </ModalBody>

          <ModalFooter>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
