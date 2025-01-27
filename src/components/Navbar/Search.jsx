import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoSearch } from "react-icons/go";
import Input from "../Input";
import Button from "../Button";

function Search() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        navigate(`/search/${data?.query}`);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center w-full max-w-lg bg-white rounded-full shadow-lg overflow-hidden"
        >
            <div className="relative flex-grow">
                <Input
                    className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Search videos, channels, and more..."
                    {...register("query", { required: true })}
                />
                <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <Button
                type="submit"
                bgColor="bg-green-600"
                className="rounded-r-full px-6 py-3 text-white font-semibold hover:bg-green-700 transition-all duration-300"
            >
                Search
            </Button>
        </form>
    );
}

export default Search;