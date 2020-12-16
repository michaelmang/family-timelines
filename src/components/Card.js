export default function Card({ children }) {
  return (
    <div className="bg-white mb-6 w-3/4 lg:w-1/4 py-6 px-8 flex flex-col shadow-xl items-center hover:shadow-2xl cursor-pointer">
      {children}
    </div>
  );
}