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
  // Define common Tailwind CSS class combinations as variables
  const headerClass = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const cellClass = "px-6 py-4 whitespace-no-wrap text-sm text-gray-900";
  const tableClass = "min-w-full bg-white divide-y divide-gray-200 rounded-lg";
  const tableContainerClass = "overflow-x-auto shadow-md sm:rounded-lg";
  const editButtonClass = "text-indigo-600 hover:text-indigo-900";
  const hoverEffectClass = "hover:bg-gray-50";
  
  return (
    <div className={tableContainerClass}>
    <table className={tableClass}>
      <thead className="bg-gray-50">
        <tr>
          <th className={`${headerClass} rounded-tl-lg`}>Original Context</th>
          <th className={headerClass}>Target Language</th>
          <th className={headerClass}>Translated Context</th>
          <th className={headerClass}>BackTranslation</th>
          <th className={headerClass}>Quality</th>
          <th className={headerClass}>Suggestion</th>
          <th className={`${headerClass} rounded-tr-lg`}>Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index} className={hoverEffectClass}>
            <td className={`${cellClass} rounded-bl-lg`}>{row.originalContext}</td>
            <td className={cellClass}>{row.targetLanguage}</td>
            <td className={cellClass}>{row.translatedContext}</td>
            <td className={cellClass}>{row.backTranslation}</td>
            <td className={cellClass}>{row.quality}</td>
            <td className={cellClass}>{row.suggestion}</td>
            <td className={`${cellClass} text-right rounded-br-lg`}>
              <button className={editButtonClass}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default FeedbackTable;
