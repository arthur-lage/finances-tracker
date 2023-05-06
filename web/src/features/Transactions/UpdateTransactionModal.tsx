import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { transactionService } from "../../services/transactionService";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../../hooks/useBalance";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

type UpdateTransactionModalType = {
  transactionId: string;
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  name: string;
  type: "INCOME" | "EXPENSE";
  value: number;
  date: Date;
};

export function UpdateTransactionModal({
  isOpen,
  onClose,
  transactionId,
}: UpdateTransactionModalType) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const { updateBalance } = useBalance();
  const { updateTransactions } = useTransactions();

  useEffect(() => {
    async function fetchTransactionData() {
      try {
        const { transaction } = await transactionService.getTransactionById({
          id: transactionId,
        });

        setValue("name", transaction.name);
        setValue("type", transaction.type);
        setValue("value", transaction.value);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setValue("date", formatDate(transaction.date, "YYYY-MM-DD"));
      } catch (err) {
        console.error(err);
      }
    }

    fetchTransactionData();
  }, []);

  async function handleUpdateTransaction(data: Inputs) {
    try {
      await transactionService.update(transactionId, {
        name: data.name,
        type: data.type,
        value: Number(data.value),
        date: data.date,
      });

      updateBalance();
      updateTransactions();
      onClose();
      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={[300, 450, 650, 850]}>
        <ModalHeader className="text-lg font-bold font-jost">
          Update Transaction
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleUpdateTransaction)}>
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
              Update
            </button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
