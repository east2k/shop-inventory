import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./db";

import { ExpandCard } from "./components/ExpandCard";
import { ShirtCard } from "./components/ShirtCard";
import { AddForm } from "./components/AddForm";

import { useGetProducts } from "./hooks/useGetProducts";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Inner />
        </QueryClientProvider>
    );
}

function Inner() {
    const {
        data,
        isLoading,
        isRefetching,
        error,
        refetch,
        searchInput,
        handleSearchInput,
        handleOnKeyDownInput,
        handleSearchButton,
    } = useGetProducts();

    const [activeItem, setActiveItem] = useState("");

    const [toggleAddForm, setToggleAddForm] = useState(false);

    const handleToggleAddForm = () => {
        setToggleAddForm(!toggleAddForm);
    };

    const handleActiveItem = (item) => {
        setActiveItem(item);
    };

    return (
        <main className="max-w-screen-xl m-auto px-5 py-7 relative">
            <h1 className="text-5xl font-bold uppercase mb-7 text-purple-500">
                Shop Inventory
            </h1>
            <div className="w-full flex items-center justify-center mb-3">
                <input
                    type="text"
                    className="border border-gray-300 rounded-sm w-1/2 px-5 py-3 outline-none"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleSearchInput}
                    onKeyDown={handleOnKeyDownInput}
                />
                <button
                    onClick={handleSearchButton}
                    className="ml-2 px-4 py-1 bg-purple-400 text-white"
                >
                    Search
                </button>
            </div>
            <div className="flex w-full mb-7">
                <button
                    onClick={handleToggleAddForm}
                    className="ml-auto text-white bg-purple-500 hover:bg-purple-400 shadow-lg rounded-sm p-2 px-5"
                >
                    Add Record
                </button>
            </div>
            {toggleAddForm && (
                <div className="flex items-center justify-center w-full bg-purple-50 py-7">
                    <AddForm
                        isLoading={isLoading}
                        isRefetching={isRefetching}
                        refetch={refetch}
                        handleToggleAddForm={handleToggleAddForm}
                    />
                </div>
            )}
            {activeItem && (
                <ExpandCard
                    handleActiveItem={handleActiveItem}
                    activeItem={activeItem}
                    refetch={refetch}
                    isLoading={isLoading}
                    isRefetching={isRefetching}
                />
            )}
            {error ? (
                <div className="flex flex-col justify-center items-center border border-red-200 rounded-lg px-8 py-7">
                    <h2 className="w-full block product-name text-center">
                        Error: {error}
                    </h2>
                </div>
            ) : !data.length ? (
                <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg px-8 py-7">
                    <h2 className="w-full block product-name text-center">
                        None Searched
                    </h2>
                </div>
            ) : isLoading || isRefetching ? (
                <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg px-8 py-7">
                    <h2 className="w-full block product-name text-center">
                        Loading
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-7 mt-7">
                    {data.map((item) => {
                        return (
                            <ShirtCard
                                handleActiveItem={handleActiveItem}
                                key={item.id}
                                shirtImage="http://placekitten.com/500/500"
                                shirtName={item.name}
                                currentItem={item}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default App;
