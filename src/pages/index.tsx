import React, { useState, useEffect } from "react";
import FeedbackTable from "../components/FeedbackTable";
import AddButton from "../components/AddButton";
import Pagination from "../components/Pagination";
import { MongoClient } from "mongodb";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL as string);
    await client.connect();
    const collection = client.db("localization").collection("translations");
    const documents = await collection.find({}).toArray();
    client.close();

    return {
      props: {
        translations: JSON.parse(JSON.stringify(documents)),
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: {
        translations: [], // Provide an empty array if there's an error
        error: "Failed to fetch data", // You can pass error messages as props as well
      },
    };
  }
};

const IndexPage = ({ translations }: { translations?: Array<object> }) => {
  console.log("📕 (Client Side):", translations);
  const [feedbackData, setFeedbackData] = useState([]);
  const [_, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (pageNumber: number) => {
    // Update the current page here
    console.log("Current Page:", pageNumber);
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
      <AddButton onAdd={() => {}} />
      <FeedbackTable data={feedbackData} />
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
