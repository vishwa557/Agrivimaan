import React, { useState } from "react";
import axios from "axios";

const ServiceRequestForm = () => {
    // State to manage form data

    const [drone_id, setDroneId] = useState('')
    const [issue_description, setIssue] = useState('')
    const [repair_date, setDate] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const response = await axios.post("http://localhost:8000/repair_form", {
                drone_id,
                issue_description,
                repair_date,
            });

            // Handle response
            if (response.status === 201) {
                console.log("POST request successful");
                // Additional actions after successful request
            } else {
                console.error("POST request failed");
                // Additional error handling
            }
        } catch (error) {
            console.error("Error during POST request:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "200px" }}>
            <label>
                Drone ID:
                <input
                    type="text"
                    name="drone_id"
                    value={drone_id}
                    onChange={(e) => setDroneId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Issue Description:
                <textarea
                    name="issue_description"
                    value={issue_description}
                    onChange={(e) => setIssue(e.target.value)}
                />
            </label>
            <br />
            <label>
                Repair Date:
                <input
                    type="date"
                    name="repair_date"
                    value={repair_date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ServiceRequestForm;