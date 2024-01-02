import React from "react";

type FeedbackTableProps = {
  data: {
    originalContext: string;
    targetLanguage: string;
    translatedContext: string;
    backTranslation: string;
    quality: string;
    suggestion: string;
  }[];
};

const FeedbackTable: React.FC<FeedbackTableProps> = ({ data }) => {
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
                <td className="cell rounded-bl-lg">{row.originalContext}</td>
                <td className="cell">{row.targetLanguage}</td>
                <td className="cell">{row.translatedContext}</td>
                <td className="cell">{row.backTranslation}</td>
                <td className="cell">{row.quality}</td>
                <td className="cell">{row.suggestion}</td>
                <td className="cell text-right rounded-br-lg">
                  <button className="edit-button">Edit</button>
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
