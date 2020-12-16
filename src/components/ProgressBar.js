export default function ProgressBar() {
  return (
    <div className="relative">
      <div className="overflow-hidden h-2 text-xs flex bg-gray-100">
        <div
          style={{ "--duration": 10 }}
          className="progress-meter rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-500"
        ></div>
      </div>
    </div>
  );
}
