import React, { useState, useEffect } from "react";
import FeedbackTable from "../components/FeedbackTable";
import AddButton from "../components/AddButton";
import Pagination from "../components/Pagination";
import { useRouter } from "next/router";

const IndexPage = ({ translations }: { translations?: Array<object> }) => {
  const router = useRouter();
  const { passcode } = router.query;
  if (passcode !== "hyte888!") {
    return (
      <div
        className="full-width relative"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <style jsx>{`
          .responsive-image {
            width: 100%;
            height: auto;
          }
        `}</style>
        <img src="/furiren.JPG" alt="Furiren" className="responsive-image" />
        <h1
          className="absolute text-[20px] sm:text-[40px] md:text-[60px]"
          style={{ bottom: "20px" }}
        >
          You don't have access to that page
        </h1>
      </div>
    );
  }
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
