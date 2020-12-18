import Layout from "./Layout.js";
import ProgressBar from "./ProgressBar.js";

export default function Loader({ children }) {
  return (
    <Layout>
      <ProgressBar />
      {children}
    </Layout>
  );
}