export default function SubmitButton({ children }) {
  return (
    <button className="bg-pink-500 rounded text-white px-4 py-2 font-bold w-max" type="submit">
      {children}
    </button>
  );
}