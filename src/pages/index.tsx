import React from "react";
import FeedbackTable from "../components/FeedbackTable";
import AddButton from "../components/AddButton";
import Pagination from "../components/Pagination";

const IndexPage = () => {
  // Fake data for the FeedbackTable component
  const feedbackData = [
    {
      originalContext: "Original context 1",
      targetLanguage: "Target language 1",
      translatedContext: "Translated context 1",
      backTranslation: "Back translation 1",
      quality: "Quality 1",
      suggestion: "Suggestion 1",
    },
    {
      originalContext: "Original context 2",
      targetLanguage: "Target language 2",
      translatedContext: "Translated context 2",
      backTranslation: "Back translation 2",
      quality: "Quality 2",
      suggestion: "Suggestion 2",
    },
    {
      originalContext: "Original context 3",
      targetLanguage: "Target language 3",
      translatedContext: "Translated context 3",
      backTranslation: "Back translation 3",
      quality: "Quality 3",
      suggestion: "Suggestion 3",
    },
  ];
  return (
    <div>
      <AddButton onAdd={() => {}} />
      <FeedbackTable data={feedbackData} />
      <Pagination itemsPerPage={10} totalItems={100} paginate={() => {}} />
    </div>
  );
};

export default IndexPage;
