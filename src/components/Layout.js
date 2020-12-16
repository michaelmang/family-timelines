export default function Layout({ children }) {
  return (
    <div
      className="min-h-screen w-screen"
      style={{ backgroundColor: "#fff" }}
    >
      {children}
    </div>
  );
}