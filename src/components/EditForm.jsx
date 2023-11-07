import { useCallback, useEffect } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

const availableSizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

export const EditForm = ({
    handleToggleEdit,
    activeItem,
    activeSizes,
    refetch,
    handleUpdateData,
}) => {
    const {
        values,
        handleFormEdit,
        handleFormSubmit,
        toggleSize,
        errors,
        submitting,
    } = useFormValidation({ ...activeItem, sizes: activeSizes });

    const { update, isUpdating, isUpdated } = useUpdateProduct();

    const handleToggleEditCallback = useCallback(handleToggleEdit, [
        handleToggleEdit,
    ]);

    useEffect(() => {
        const updatedBooleans = availableSizes.map((size) =>
            values.sizes.includes(size)
        );

        const submitData = async () => {
            if (isUpdating || isUpdated) {
                return;
            }
            try {
                await update({ ...values, sizes: updatedBooleans });
                await refetch();
            } finally {
                handleToggleEditCallback();
                handleUpdateData({ ...values });
            }
        };
        if (submitting) {
            submitData();
        }
    }, [
        submitting,
        update,
        refetch,
        handleUpdateData,
        handleToggleEditCallback,
        values,
        isUpdating,
        isUpdated,
    ]);

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col w-1/2 px-7 overflow-auto"
        >
            {isUpdating || isUpdated ? (
                <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg px-8 py-7">
                    <h2 className="w-full block product-name text-center">
                        {isUpdating ? "Updating..." : "Successful"}
                    </h2>
                </div>
            ) : (
                <>
                    {errors.name && (
                        <span className="text-red-300 text-sm">
                            {errors.name}
                        </span>
                    )}
                    <input
                        onChange={handleFormEdit}
                        type="text"
                        className="text-2xl break-words mb-4 p-1 border outline-none"
                        value={values.name}
                        name="name"
                    />
                    {errors.stock && (
                        <span className="text-red-300 text-sm">
                            {errors.stock}
                        </span>
                    )}
                    <div className="flex flex-row items-center mb-2 w-full">
                        <label className="mr-2" htmlFor="stock">
                            Stocks
                        </label>
                        <input
                            type="number"
                            value={values.stock}
                            required
                            className="p-1 outline-none w-full"
                            name="stock"
                            onChange={handleFormEdit}
                        />
                    </div>
                    {errors.price && (
                        <span className="text-red-300 text-sm">
                            {errors.price}
                        </span>
                    )}
                    <div className="relative flex flex-row items-center mb-2 w-full">
                        <label className="mr-2" htmlFor="price">
                            Price:{" "}
                        </label>
                        <span className="absolute left-14">&#8369;</span>
                        <input
                            type="number"
                            value={values.price}
                            required
                            className="py-1 outline-none w-full pl-4"
                            name="price"
                            onChange={handleFormEdit}
                        />
                    </div>
                    <div className="mb-4">
                        <p>Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => toggleSize(item)}
                                        className={`hover:bg-slate-400 px-2 py-1 rounded-md text-white cursor-pointer ${
                                            values.sizes.includes(item)
                                                ? "bg-slate-500"
                                                : "bg-slate-300"
                                        }`}
                                    >
                                        {item}
                                    </span>
                                );
                            })}
                            {errors.sizes && (
                                <span className="text-red-300 text-sm flex items-center">
                                    {errors.sizes}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2 w-full">
                        {errors.description && (
                            <span className="text-red-300 text-sm">
                                {errors.description}
                            </span>
                        )}
                        <label htmlFor="description">Description: </label>
                        <textarea
                            className="block p-1 w-full outline-none text-sm resize-none"
                            value={values.description}
                            name="description"
                            onChange={handleFormEdit}
                        />
                    </div>
                    <button className="mt-auto text-white bg-purple-500 hover:bg-purple-400 shadow-lg rounded-sm p-2">
                        Update
                    </button>
                    <button
                        onClick={handleToggleEdit}
                        className="mt-1 text-white bg-purple-900 hover:bg-purple-800 shadow-lg rounded-sm p-2"
                    >
                        Cancel
                    </button>
                </>
            )}
        </form>
    );
};
