import { useState } from "react";

const validationRules = {
    name: [
        {
            validator: (value) =>
                typeof value === "string" && value.trim() !== "",
            message: "Name is required.",
        },
    ],
    stock: [
        {
            validator: (value) =>
                value !== null && value !== undefined && value !== 0,
            message: "Stock is required.",
        },
    ],
    price: [
        {
            validator: (value) =>
                value !== null && value !== undefined && value !== 0,
            message: "Price is required.",
        },
    ],
    description: [
        {
            validator: (value) =>
                typeof value === "string" && value.trim() !== "",
            message: "Description is required.",
        },
    ],
    sizes: [
        {
            validator: (value) => value.length !== 0,
            message: "Sizes must not be empty.",
        },
    ],
};

export const useFormValidation = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleIsSubmitting = (value) => {
        setSubmitting(value);
    };

    const validateForm = (values) => {
        const errors = {};
        for (const field in validationRules) {
            if (field in validationRules) {
                const rules = validationRules[field];
                for (const rule of rules) {
                    if (!rule.validator(values[field])) {
                        errors[field] = rule.message;
                        break;
                    }
                }
            }
        }
        if (Object.keys(errors).length === 0) handleIsSubmitting(true);
        else handleIsSubmitting(false);
        return errors;
    };

    const handleFormEdit = (e) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };

    const toggleSize = (size) => {
        const prevSizes = values.sizes;
        let newSizes = [];
        if (prevSizes.includes(size)) {
            newSizes = prevSizes.filter((item) => item !== size);
        } else {
            newSizes = [...prevSizes, size];
        }
        setValues({ ...values, sizes: newSizes });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(values));
    };

    return {
        values,
        handleFormEdit,
        handleFormSubmit,
        toggleSize,
        errors,
        submitting,
        handleIsSubmitting,
    };
};
