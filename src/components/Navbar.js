export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 lg:px-12 lg:py-6">
      <div className="text-pink-500 font-bold cursive text-xl lg:text-3xl tracking-wide">
        Family Timelines
      </div>
      <div className="flex items-center">
        <button className="bg-pink-500 text-white px-2 py-1 lg:px-4 lg:py-2 mr-2 rounded font-bold text-xs lg:text-sm">
          Sign Up
        </button>
        <button className="text-pink-500 px-2 py-1 lg:px-4 lg:py-2 rounded font-bold text-xs lg:text-sm">
          Log In
        </button>
      </div>
    </div>
  );
}