export const getServerSideProps = () => {
  console.log("getServerSideProps called");
  return {
    props: {
      id: 1,
    },
  };
};

export default function Home({ id }: { id: number }) {
  console.log("Home component, ID:", id);
  return (
    <div>
      <h1>Home Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
