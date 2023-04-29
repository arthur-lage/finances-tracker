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

      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={[300, 450, 650, 850]}>
        <ModalHeader className="text-lg font-bold font-jost">
          New Transaction
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <ModalBody className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-jost font-semibold" htmlFor="name">
                Name
              </label>
              <input
                {...register("name", {
                  required: true,
                })}
                type="text"
                id="name"
                placeholder="Name"
                className={`w-full bg-white placeholder:text-zinc-700 text-black border-2 focus:border-indigo-500 transition-all duration-150 ease-out outline-none pl-3 h-[40px] rounded-md shadow-md font-jost font-medium text-lg ${
                  errors.name ? "border-red-500" : "border-input-border"
                }`}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-jost font-semibold" htmlFor="type">
                Type
              </label>
              <select
                className={`w-full bg-white border-input-border placeholder:text-zinc-700 text-black border-2 focus:border-indigo-500 transition-all duration-150 ease-out outline-none pl-3 h-[40px] rounded-md shadow-md font-jost font-medium text-lg`}
                {...register("type", { required: true })}
                id="type"
              >
                <option defaultChecked value="INCOME">
                  Income
                </option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-jost font-semibold" htmlFor="value">
                Value (R$)
              </label>
              <input
                {...register("value", { required: true })}
                type="number"
                id="value"
                step="0.01"
                placeholder="Value"
                className={`w-full bg-white placeholder:text-zinc-700 text-black border-2 border-violet focus:border-indigo-500 transition-all duration-150 ease-out outline-none pl-3 h-[40px] rounded-md shadow-md font-jost font-medium text-lg ${
                  errors.value ? "border-red-500" : "border-input-border"
                }`}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-jost font-semibold" htmlFor="date">
                Date
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                id="date"
                placeholder="Date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                className={`w-full bg-white placeholder:text-zinc-700 text-black border-2 focus:border-white transition-all duration-150 ease-out outline-none pl-3 h-[40px] rounded-md shadow-md font-jost font-medium text-lg ${
                  errors.date ? "border-red-500" : "border-input-border"
                }`}
              />
            </div>
          </ModalBody>

          <ModalFooter className="flex items-center gap-5">
            <button
              className="text-white text-lg border-2 hover:border-red-400 border-red-800 bg-red-700 font-semibold font-jost rounded-md transition-all duration-150 hover:brightness-110 px-4 py-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="text-white text-lg border-2 hover:border-indigo-400 border-indigo-800 bg-indigo-700 font-semibold font-jost rounded-md transition-all duration-150 hover:brightness-110 px-4 py-1"
              type="submit"
            >
              Create
            </button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
