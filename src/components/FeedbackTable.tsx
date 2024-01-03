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
  const [selectedQuality, setSelectedQuality] = useState(
    data.reduce((acc, row) => {
      // @ts-ignore
      acc[row._id] = row.quality;
      return acc;
    }, {})
  );
  const [suggestion, setSuggestion] = useState(
    data.reduce((acc, row) => {
      // @ts-ignore
      acc[row._id] = row.suggestion;
      return acc;
    }, {})
  );

  console.log("📝 suggestion", suggestion);

  const handleIconClick = async (id: string) => {
    console.log("current_id:", id);
    // Make a request to your API endpoint to update the MongoDB instance
    // const response = await fetch(`/api/updateFeedback/${id}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ quality: selectedQuality, suggestion }),
    // });

    // if (!response.ok) {
    //   console.error("Error updating feedback");
    // }
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
                    value={selectedQuality[row._id]}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="cell">
                  <input
                    type="text"
                    // @ts-ignore
                    value={suggestion[row._id] || ""}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
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
