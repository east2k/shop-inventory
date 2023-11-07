import { useMutation } from "@tanstack/react-query";
import { supabase } from "../db";

const deleteData = async (chosenId) => {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", chosenId);

    if (error) {
        throw new Error(error.message);
    }
};

export const useDeleteProduct = () => {
    const { mutateAsync, status, error } = useMutation({
        mutationFn: deleteData,
    });

    return {
        deleteData: mutateAsync,
        isDeleting: status === "pending",
        isDeleted: status === "success",
        error,
    };
};
