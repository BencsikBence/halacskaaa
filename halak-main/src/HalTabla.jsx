import React, { useEffect, useState } from "react";
import axios from "axios";

const FishTable = () => {
    const [fishList, setFishList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5032/api/Halak")
            .then((response) => setFishList(response.data))
            .catch((error) => console.error("Hiba a lekérésnél:", error));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Halak Táblázat</h2>
            <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Név</th>
                        <th className="border border-gray-400 px-4 py-2">Faj</th>
                        <th className="border border-gray-400 px-4 py-2">Méret (cm)</th>
                        <th className="border border-gray-400 px-4 py-2">Tó</th>
                        <th className="border border-gray-400 px-4 py-2">Kép</th>
                    </tr>
                </thead>
                <tbody>
                    {fishList.map((fish, index) => (
                        <tr key={index} className="border border-gray-400">
                            <td className="border border-gray-400 px-4 py-2">{fish.nev}</td>
                            <td className="border border-gray-400 px-4 py-2">{fish.faj}</td>
                            <td className="border border-gray-400 px-4 py-2">{fish.meretCm} cm</td>
                            <td className="border border-gray-400 px-4 py-2">{fish.to?.nev} ({fish.to?.helyszin})</td>
                            <td className="border border-gray-400 px-4 py-2">
                                {fish.kep ? (
                                    <img 
                                        src={`data:image/jpeg;base64,${fish.kep}`} 
                                        alt={fish.nev} 
                                        className="w-20 h-20 object-cover rounded-lg shadow" 
                                    />
                                ) : (
                                    "Nincs kép"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FishTable;
