export default function CardLoadig() {
  return (
    <div className="border rounded-md shadow-lg p-4  hover:bg-indigo-200 cursor-pointer flex-[1_1_25%]">
      <div className="bg-slate-200 font-bold mb-2 h-2 "></div>
      <div className="mb-3 text-lg text-gray-700 h-fit max-h-20 text-ellipsis overflow-hidden ">
        <div className="h-1 bg-slate-200"></div>
        <div className="h-1 bg-slate-200"></div>
        <div className="h-1 bg-slate-200"></div>
      </div>
      <div className="text-gray-500 text-sm h-1 bg-slate-200"></div>
    </div>
  );
}
