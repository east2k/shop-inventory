import { useMutation } from "@tanstack/react-query";
import { supabase } from "../db";

const updateData = async (form) => {
    const { error } = await supabase
        .from("products")
        .update({ name: form.name, description: form.description })
        .eq("id", form.id);

    const { priceError } = await supabase
        .from("prices")
        .update([
            {
                amount: form.price,
            },
        ])
        .eq("id", form.id);

    const { stockError } = await supabase
        .from("stocks")
        .update([
            {
                count: form.stock,
            },
        ])
        .eq("id", form.id);

    const { sizesError } = await supabase
        .from("sizes")
        .update([
            {
                xxs: form.sizes[0],
                xs: form.sizes[1],
                s: form.sizes[2],
                m: form.sizes[3],
                l: form.sizes[4],
                xl: form.sizes[5],
                xxl: form.sizes[6],
                xxxl: form.sizes[7],
            },
        ])
        .eq("id", form.id);

    if ((error || priceError || stockError, sizesError)) {
        throw new Error("Failed to update one or more tables.");
    }
};

export const useUpdateProduct = () => {
    const { mutateAsync, status, error } = useMutation({
        mutationFn: updateData,
    });
    
    return {
        update: mutateAsync,
        isUpdating: status === "pending",
        isUpdated: status === "success",
        error,
    };
};
