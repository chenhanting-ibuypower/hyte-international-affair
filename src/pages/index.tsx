import React, { useState, useEffect } from "react";
import FeedbackTable from "../components/FeedbackTable";
import AddButton from "../components/AddButton";
import Pagination from "../components/Pagination";

const IndexPage = ({
  translations,
  reload,
}: {
  translations?: Array<object>;
  reload: () => void;
}) => {
  console.log("📕 (Client Side):", translations);
  const [feedbackData, setFeedbackData] = useState([]);
  const [_, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    // Add your logic to update the current page
    setCurrentPage(pageNumber);
  };

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await fetch(`/api/translate?page=${pageNumber}`);
      const data = await response.json();
      console.log("📕 (API):", data);

      setFeedbackData(data.documents);
      setEndIndex(data.endIndex);
      setTotalPages(data.totalPages);
      setTotalDocuments(data.totalDocuments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <AddButton reload={() => fetchData(currentPage)} />
      <FeedbackTable
        data={feedbackData}
        reload={() => fetchData(currentPage)}
      />
      <Pagination
        itemsPerPage={10}
        totalItems={totalDocuments}
        paginate={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default IndexPage;
