import axios from "axios";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline"; // New import path for v2

// "en-US", "en-GB", "es", "de", "fr", "pl", "it", "nl", "ko", "ja", "zh-TW", "zh-CN", and Portuguese ("pt")
const locales = [
  "en-US",
  "en-GB",
  "es",
  "de",
  "fr",
  "pl",
  "it",
  "nl",
  "ko",
  "ja",
  "zh-TW",
  "zh-CN",
  "pt",
];

const TranslationInputList = ({ onAdd }: { onAdd: any }) => {
  const [rows, setRows] = useState([{ value: "" }]);
  const [locale, setLocale] = useState("en-US");
  const [backLanguage, setBackLanguage] = useState("en-US");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleTranslateAll = () => {
    setIsProcessing(true);
    const formattedRows = rows
      .filter((row) => row.value !== "")
      .map((row) => row.value);

    axios
      .post("https://hyte-support.azurewebsites.net/api/back-translate", {
        locale,
        backLanguage,
        content: formattedRows,
      })
      .then(async (res) => {
        const payload = res.data;

        const { data: insertedContent } = await axios.post("/api/translate", {
          locale,
          original: formattedRows,
          backLanguage,
          translatedText: payload.translatedText,
          backLanguageContent: payload.backLanguage,
        });

        console.log(insertedContent);

        onAdd(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedContent = event.clipboardData.getData("text");
    const pastedRows = pastedContent
      .split("\n")
      .filter((line) => line.trim() !== "") // Filter out empty lines
      .map((line) => {
        let value = line.replace(/^["']+|["']+$/g, "").trim();
        value = value.replace(/^["']+|["']+$/g, "");

        if (value.endsWith('",') || value.endsWith("',")) {
          // Remove trailing comma and quotes, if present
          value = value.slice(0, -2);
        }

        return {
          // Remove quotes from the start and end of each line, if present
          value,
        };
      });

    setRows((rows) => {
      // Create a new Set with existing row values
      const existingValues = new Set(rows.map((row) => row.value));
      // Filter out pasted rows that are already in the existing rows
      const newRows = pastedRows.filter(
        (row) => !existingValues.has(row.value)
      );
      return [...rows, ...newRows]; // Append only new rows to the existing ones
    });
  };
  return (
    <div className="max-w-3xl mx-auto py-8">
      <button
        onClick={addRow}
        className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        ADD
      </button>

      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <input
              type="text"
              value={row.value}
              onChange={(e) => handleInputChange(e, index)}
              className="border border-gray-300 p-2 rounded-md flex-grow shadow-sm"
              placeholder="Enter text"
            />
            <button onClick={() => removeRow(index)} className="p-2">
              <TrashIcon className="h-5 w-5 text-gray-600 hover:text-gray-800 transition duration-300" />
            </button>
          </div>
        ))}
      </div>

      <textarea
        onPaste={handlePaste} // Uncomment and implement handlePaste if needed
        className="mt-4 w-full border border-gray-300 p-2 rounded-md shadow-sm"
        placeholder="Paste multiple lines here"
        rows={5} // Adjust the number of rows as needed
      />

      <div className="flex gap-4 items-center">
        <label htmlFor="locale">Locale:</label>
        <select
          id="locale"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-sm"
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>

        <label htmlFor="backLanguage">Back Language:</label>
        <select
          id="backLanguage"
          value={backLanguage}
          onChange={(e) => setBackLanguage(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-sm"
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>
      {isProcessing ? (
        <button
          className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300 w-full"
          disabled
        >
          LOADING...
        </button>
      ) : (
        <button
          className="mt-4 px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300 w-full"
          onClick={handleTranslateAll}
        >
          TRANSLATE ALL
        </button>
      )}
    </div>
  );
};

export default TranslationInputList;
