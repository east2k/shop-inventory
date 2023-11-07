import { useQuery } from "@tanstack/react-query";
import { supabase } from "../db";
import { useState } from "react";

const readData = async (value) => {
    console.log(value);
    let query = supabase
        .from("products")
        .select(`*, stocks(count), prices(amount), sizes(*)`)
        .order("id", { ascending: false });

    if (value) {
        query = query.textSearch("name", `'${value}'`);
    }

    const { data } = await query;
    return data;
};

export const useGetProducts = () => {
    const [searchInput, setSearchInput] = useState("");

    const {
        data = [],
        error,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery({ queryKey: ["todos"], queryFn: () => readData(searchInput) });

    const handleSearchButton = async () => {
        await refetch();
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnKeyDownInput = (e) => {
        if (e.key === "Enter") {
            handleSearchButton();
        }
    };

    const products = data ? data.map(mapProducts) : [];

    console.log(products);

    return {
        data: products,
        isLoading,
        isRefetching,
        searchInput,
        handleOnKeyDownInput,
        handleSearchButton,
        handleSearchInput,
        refetch,
        error,
    };
};

const mapProducts = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        stock: data.stocks?.count,
        price: data.prices?.amount,
        sizes: [
            data.sizes?.xxs,
            data.sizes?.xs,
            data.sizes?.s,
            data.sizes?.m,
            data.sizes?.l,
            data.sizes?.xl,
            data.sizes?.xxl,
            data.sizes?.xxxl,
        ],
    };
};
