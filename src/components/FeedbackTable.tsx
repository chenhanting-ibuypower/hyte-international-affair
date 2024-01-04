import axios from "axios";
import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"; // New import path for v2

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
};

const FeedbackTable: React.FC<FeedbackTableProps> = ({ data }) => {
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

  const handleIconClick = async (id: string) => {
    console.log("current_id:", id);

    // Make a request to your API endpoint to update the MongoDB instance
    try {
      const response = await axios.post(`/api/translate/${id}`, {
        // @ts-ignore
        quality: selectedQualities[id],
        // @ts-ignore
        suggestion: suggestions[id],
      });
      // Handle response
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating feedback:", error);
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
              <th className="header">BackTranslation</th>
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
                <td className="cell">{row.to}</td>
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
                    // @ts-ignore
                    value={data.find((d) => d._id === row._id).quality}
                    onChange={(e) =>
                      setSelectedQuality({
                        ...selectedQualities,
                        [row._id]: e.target.value,
                      })
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="cell">
                  <textarea
                    // @ts-ignore
                    value={data.find((d) => d._id === row._id).suggestion}
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
