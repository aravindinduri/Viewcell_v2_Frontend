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
            className="flex items-center w-full max-w-lg"
        >
            {/* Input Wrapper */}
            <div className="relative flex-grow">
                <Input
                    className="w-full rounded-l-full px-10 py-2 border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Search"
                    {...register("query", { required: true })}
                />
                {/* Search Icon */}
                <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                bgColor="bg-green-600"
                className="rounded-r-full px-6 py-2 text-white font-semibold hover:bg-green-700 transition-all"
            >
                Search
            </Button>
        </form>
    );
}

export default Search;
