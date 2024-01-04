import axios from "axios";
import React, { useState } from "react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline"; // New import path for v2
import { localeNames, locales } from "../constants/project";

type FeedbackTableProps = {
  data: {
    _id: string;
    original: string; // was originalContext
    to: string; // was targetLanguage
    translatedText: string; // was translatedContext
    backLanguageContent: string; // was backTranslation
    backLanguage: string;
    quality?: string; // optional if not always present
    suggestion?: string; // optional if not always present
  }[];
  reload: () => void;
};

const FeedbackTable: React.FC<FeedbackTableProps> = ({ data, reload }) => {
  const [selectedQualities, setSelectedQuality] = useState(
    data.reduce((acc, row) => {
      // @ts-ignore
      acc[row._id] = row.quality;
      return acc;
    }, {})
  );
  const [suggestions, setSuggestion] = useState(
    data.reduce((acc, row) => {
      // @ts-ignore
      acc[row._id] = row.suggestion;
      return acc;
    }, {})
  );

  const handleIconDelete = async (id: string) => {
    // Make a request to your API endpoint to update the MongoDB instance
    try {
      const response = await axios.delete(`/api/translate/${id}`);
      // Handle response
      console.log("Response:", response);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Error deleting feedback");
    } finally {
      // Reload the page
      reload();
    }
  };

  const handleIconClick = async (id: string) => {
    console.log("current_id:", id);
    // @ts-ignore
    const quality = selectedQualities[id];
    // @ts-ignore
    const suggestion = suggestions[id];

    if (!quality) {
      return alert("Please select a quality rating");
    }

    if (!suggestion && quality <= 7) {
      return alert("Please provide a suggestion");
    }

    // Make a request to your API endpoint to update the MongoDB instance
    try {
      console.log({ quality, suggestion, path: `/api/translate/${id}` });
      const response = await axios.post(`/api/translate/${id}`, {
        // @ts-ignore
        quality,
        // @ts-ignore
        suggestion,
      });
      // Handle response
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Error updating feedback");
    } finally {
      // Reload the page
      reload();
    }
  };

  return (
    <div>
      <style jsx>{`
        .header {
          padding: 6px;
          text-align: left;
          font-size: 12px;
          font-weight: medium;
          color: #555555;
          text-transform: uppercase;
        }

        .cell {
          padding: 6px;
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
        }

        .table {
          min-width: 100%;
          background-color: #ffffff;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 4px;
        }

        .table-container {
          overflow-x: auto;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        .edit-button {
          color: #4f46e5;
          cursor: pointer;
        }

        .hover-effect {
          &:hover {
            background-color: #f9fafb;
          }
        }

        .rounded-tl-lg {
          border-top-left-radius: 4px;
        }

        .rounded-tr-lg {
          border-top-right-radius: 4px;
        }

        .rounded-bl-lg {
          border-bottom-left-radius: 4px;
        }

        .rounded-br-lg {
          border-bottom-right-radius: 4px;
        }

        .header {
          padding: 6px;
          text-align: left;
          font-size: 12px;
          font-weight: medium;
          color: #555555;
          text-transform: uppercase;
        }

        .cell {
          padding: 6px;
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
          overflow-wrap: break-word; // Added this line
        }

        pre {
          white-space: pre; /* CSS 2.0 */
          white-space: pre-wrap; /* CSS 2.1 */
          white-space: pre-line; /* CSS 3.0 */
          white-space: -pre-wrap; /* Opera 4-6 */
          white-space: -o-pre-wrap; /* Opera 7 */
          white-space: -moz-pre-wrap; /* Mozilla */
          white-space: -hp-pre-wrap; /* HP Printers */
          word-wrap: break-word; /* IE 5+ */
        }
      `}</style>
      <div className="table-container">
        <table className="table">
          <thead className="bg-gray-50">
            <tr>
              <th className="header rounded-tl-lg">Original Context</th>
              <th className="header">Target Language</th>
              <th className="header">Translated Context</th>
              <th className="header">Back Translation</th>
              <th className="header">Quality</th>
              <th className="header">Suggestion</th>
              <th className="header rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover-effect">
                <td
                  className="cell rounded-bl-lg max-w-xs break-words"
                  style={{ maxWidth: "600px" }}
                >
                  <pre>{row.original}</pre>
                </td>

                <td className="cell">
                  {
                    // @ts-ignore
                    localeNames[row.to as keyof LocaleNames as string]
                  }
                </td>
                <td
                  className="cell rounded-bl-lg max-w-xs break-words"
                  style={{ maxWidth: "600px" }}
                >
                  <pre>{row.translatedText}</pre>
                </td>
                <td
                  className="cell rounded-bl-lg max-w-xs break-words"
                  style={{ maxWidth: "600px" }}
                >
                  <pre>{row.backLanguageContent}</pre>
                </td>
                <td>
                  <select
                    defaultValue={
                      // @ts-ignore
                      data.find((d) => d._id === row._id).quality || ""
                    }
                    onChange={(e) =>
                      setSelectedQuality({
                        ...selectedQualities,
                        [row._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Not Selected</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="cell">
                  <textarea
                    defaultValue={
                      // @ts-ignore
                      data.find((d) => d._id === row._id).suggestion
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      setSuggestion({
                        ...suggestions,
                        [row._id]: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="cell text-right rounded-br-lg">
                  <button
                    className="edit-button"
                    onClick={() => handleIconClick(row._id)}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleIconDelete(row._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
