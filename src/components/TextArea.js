export default function TextArea({ label, ...rest }) {
  return (
    <label className="flex flex-col text-white text-base font-bold my-2">
      {label}
      <textarea
        className="cursor-pointer rounded border-solid px-2 py-1 border-2 border-white text-white font-normal text-base mb-2 w-1/2 bg-transparent"
        {...rest}
      />
    </label>
  );
}