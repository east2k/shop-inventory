import { useState } from "react";
import { Icon } from "@iconify/react";

import { ImageContainer } from "./ImageContainer";
import { EditForm } from "./EditForm";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const availableSize = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

export const ExpandCard = ({
    handleActiveItem,
    activeItem,
    refetch,
    isLoading,
    isRefetching,
}) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [updatedData, setUpdatedData] = useState(null);
    const [activeSizes, setActiveSizes] = useState(
        availableSize.filter((_, index) => activeItem.sizes[index])
    );

    const { deleteData, isDeleting, isDeleted } = useDeleteProduct();

    const handleToggleEdit = () => {
        setToggleEdit(!toggleEdit);
    };

    const handleUpdateData = (data) => {
        setUpdatedData(data);
        setActiveSizes(availableSize.filter((_, index) => data.sizes[index]));
    };

    const handleDeleteData = async (chosenId) => {
        if (isDeleting) {
            return;
        }
        try {
            await deleteData(chosenId);
            await refetch();
        } finally {
            handleActiveItem();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-50/50">
            {isDeleting || isDeleted ? (
                <div className="flex flex-col w-full h-full justify-center items-center border border-gray-200 rounded-lg">
                    <h2
                        className={`block product-name text-center bg-purple-700 text-white px-10 py-7 transition-opacity ${
                            isDeleted ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        {isDeleting ? "Deleting..." : "Successfully Deleted"}
                    </h2>
                </div>
            ) : isLoading ? (
                <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg px-8 py-7">
                    <h2 className="w-full block product-name text-center">
                        Loading
                    </h2>
                </div>
            ) : (
                <div className="flex flex-row absolute p-7 w-2/3 max-h-[50%] bg-slate-100 border border-slate-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ImageContainer
                        imageSrc="http://placekitten.com/500/500"
                        size="big"
                    />
                    {!toggleEdit ? (
                        <div className="flex flex-col w-1/2 px-7 overflow-auto">
                            <h1 className="text-2xl break-words mb-4">
                                {updatedData
                                    ? updatedData.name
                                    : activeItem.name}
                            </h1>
                            <p className="mb-2">
                                Stocks:{" "}
                                {updatedData
                                    ? updatedData.stock
                                    : activeItem.stock}
                            </p>
                            <p className="mb-2">
                                Price: &#8369;{" "}
                                {updatedData
                                    ? updatedData.price
                                    : activeItem.price}
                            </p>
                            <div className="mb-4">
                                <p>Sizes:</p>
                                <div className="flex flex-wrap gap-2">
                                    {activeSizes.map((item, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="bg-slate-500 px-2 py-1 rounded-md text-white"
                                            >
                                                {item}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <p>
                                Description:
                                <br />
                                {updatedData
                                    ? updatedData.description
                                    : activeItem.description}
                            </p>
                            <button
                                onClick={handleToggleEdit}
                                className="mt-auto text-white bg-purple-500 hover:bg-purple-400 shadow-lg rounded-sm p-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteData(activeItem.id)}
                                className="mt-1 text-white bg-purple-900 hover:bg-purple-800 shadow-lg rounded-sm p-2"
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <EditForm
                            handleToggleEdit={handleToggleEdit}
                            activeItem={updatedData || activeItem}
                            activeSizes={activeSizes}
                            refetch={refetch}
                            isRefetching={isRefetching}
                            handleUpdateData={handleUpdateData}
                        />
                    )}
                    <button
                        onClick={() => handleActiveItem("")}
                        className="absolute top-2 right-2 text-2xl hover:bg-purple-300 hover:text-white rounded-full p-1"
                    >
                        <Icon icon="ph:x" />
                    </button>
                </div>
            )}
        </div>
    );
};
