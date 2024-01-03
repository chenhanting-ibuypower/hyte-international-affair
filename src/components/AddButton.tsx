import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline"; // New import path for v2

const TranslationInputList = () => {
  const [rows, setRows] = useState([{ value: "" }]);

  const addRow = () => {
    const newRow = { value: "" };
    setRows([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const handleInputChange = (value: string, index: number) => {
    const newRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { value } : row
    );
    setRows(newRows);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-x-3">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ADD
        </button>
        <div className="flex-grow">
          {rows.map((row, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={row.value}
                onChange={(e) => handleInputChange(e.target.value, index)}
                className="border-2 border-gray-300 p-2 rounded flex-grow"
              />
              <button onClick={() => removeRow(index)} className="p-2 ml-2">
                <TrashIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full">
        TRANSLATE ALL
      </button>
    </div>
  );
};

export default TranslationInputList;
