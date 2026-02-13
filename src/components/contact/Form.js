"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
};

const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/;

const validationSchema = Yup.object({
    firstName: Yup.string()
        .matches(nameRegex, "Letters only")
        .max(40, "Max 40 characters")
        .required("Required"),
    lastName: Yup.string()
        .matches(nameRegex, "Letters only")
        .max(40, "Max 40 characters")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().required("Required"),
});

export default function Form() {
    const [loading, setLoading] = useState(false);

    const handleToast = (type, message) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    setLoading(true);

                    const response = await fetch("/api/send-email-contact-us", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        toast.success("Message sent successfully!");
                        resetForm();
                    } else {
                        toast.error(data?.error || "Failed to send message.");
                    }
                } catch (error) {
                    toast.error("Something went wrong! Please try again later.");
                } finally {
                    setLoading(false);
                }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">

                        {/* First Name */}
                        <div>
                            <input
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="First Name *"
                                className="w-full border-b border-secondary-5 bg-transparent py-2 outline-none"
                            />
                            {touched.firstName && errors.firstName && (
                                <span className="text-red-500 text-[12px]">
                                    {errors.firstName}
                                </span>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <input
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Last Name *"
                                className="w-full border-b border-secondary-5 bg-transparent py-2 outline-none"
                            />
                            {touched.lastName && errors.lastName && (
                                <span className="text-red-500 text-[12px]">
                                    {errors.lastName}
                                </span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <input
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email *"
                                className="w-full border-b border-secondary-5 bg-transparent py-2 outline-none"
                            />
                            {touched.email && errors.email && (
                                <span className="text-red-500 text-[12px]">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Message */}
                        <div className="sm:col-span-2">
                            <textarea
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Message *"
                                rows={1}
                                className="w-full border-b border-secondary-5 bg-transparent py-2 resize-none outline-none"
                            />
                            {touched.message && errors.message && (
                                <span className="text-red-500 text-[12px]">
                                    {errors.message}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`capitalize font-btn-text px-[11px] py-[14px] rounded-[8px] text-white bg-orange w-full flex gap-[4px] justify-center items-center group ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Submitting..." : (
                            <>
                                <span className="translate-x-[10px] group-hover:translate-x-[0px] transition-all duration-500 ease-in-out">
                                    Submit Request
                                </span>
                                <span className="-translate-x-[10px] opacity-0 group-hover:translate-x-[0px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <svg width="16" height="14" viewBox="0 0 14 15" fill="none" className="rtl:rotate-180">
                                        <path
                                            d="M10.8888 6.87812L6.80743 2.79678L7.75802 1.84619L13.4622 7.55039L12.9869 8.02569L7.75802 13.2546L6.80743 12.304L10.8888 8.22266H0.0168457V6.87812H10.8888Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                            </>
                        )}
                    </button>
                </form>
            )}
        </Formik>
    );
}
