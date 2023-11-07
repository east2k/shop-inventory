import { useState } from "react";
import { supabase } from "../db";

export const useInsertProduct = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const insert = async (form) => {
        if (isLoading) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await supabase
                .from("products")
                .insert([
                    {
                        name: form.name,
                        description: form.description,
                    },
                ])
                .select("id");

            const id = response.data.at(0).id;

            await supabase.from("prices").insert([
                {
                    id,
                    amount: form.price,
                },
            ]);
            await supabase.from("stocks").insert([
                {
                    id,
                    count: form.stock,
                },
            ]);
            await supabase.from("sizes").insert([
                {
                    id,
                    xxs: form.sizes[0],
                    xs: form.sizes[1],
                    s: form.sizes[2],
                    m: form.sizes[3],
                    l: form.sizes[4],
                    xl: form.sizes[5],
                    xxl: form.sizes[6],
                    xxxl: form.sizes[7],
                },
            ]);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };
    return { insert, isLoading, error };
};
