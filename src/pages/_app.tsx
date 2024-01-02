import "../styles/global.css";

function MyApp({
  Component,
  PageProps,
}: {
  Component: React.ComponentType<any>;
  PageProps: any;
}) {
  return <Component {...PageProps} />;
}

export default MyApp;
