import React from "react";
import {useParams} from 'react-router-dom'
const Success = () => {
    const { successMessage } = useParams();
    return (
        <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4 mt-10">
            <div className="border p-6 rounded-lg w-full md:max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Success!</h2>
                <p className="text-center">{successMessage}</p>
            </div>
        </div>
    );
};

export default Success;
