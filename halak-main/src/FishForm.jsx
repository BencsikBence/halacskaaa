import React, { useState } from "react";
import axios from "axios";

const FishForm = () => {
    const [fishData, setFishData] = useState({
        nev: "",
        faj: "",
        meretCm: 0,
        toId: 0,
        kep: ""
    });

    const handleChange = (e) => {
        setFishData({ ...fishData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFishData((prevData) => ({ ...prevData, kep: reader.result.split(",")[1] }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5032/api/Halak", fishData);
            console.log("Siker:", response.data);
            alert("Hal sikeresen hozzáadva!");
        } catch (error) {
            console.error("Hiba a küldésnél:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-xl font-bold mb-4">Új hal hozzáadása</h2>
            <input type="text" name="nev" placeholder="Név" onChange={handleChange} className="border p-2 m-2" />
            <input type="text" name="faj" placeholder="Faj" onChange={handleChange} className="border p-2 m-2" />
            <input type="number" name="meretCm" placeholder="Méret (cm)" onChange={handleChange} className="border p-2 m-2" />
            <input type="number" name="toId" placeholder="Tó ID" onChange={handleChange} className="border p-2 m-2" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 m-2" />
            <button type="submit" className="bg-blue-500 text-white p-2">Küldés</button>
        </form>
    );
};

export default FishForm;
