import { useEffect, useState } from "react";
import masterDataService from "../services/masterDataService";
import ITopTen from "../interfaces/ITopTen";

export default function SideBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ITopTen[]>([]);

  const ShowComponent = () => {
    if (isLoading) {
      const items = [];

      for (let index = 0; index < 10; index++) {
        items.push(
          <div key={index} className=" shadow border rounded-md p-3  w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-3 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return items;
    }

    return data.map((item, index) => (
      <div
        key={index}
        className="shadow border rounded-md p-3 h-fit max-md:w-fit w-full"
      >
        <div className="font-bold text-indigo-500 mb-1 text-nowrap">
          {item.category_name}
        </div>
        <div className="text-md text-gray-500 text-nowrap">
          {item.total_user} Users
        </div>
      </div>
    ));
  };

  useEffect(() => {
    async function init() {
      setTimeout(async () => {
        try {
          const result = await masterDataService.getCategoriesTopTen();
          setData(result);
          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    }
    init();
  }, []);

  return (
    <div className="flex flex-col md:basis-1/3 lg:basis-1/4 max-md:flex-row bg-white max-md:shadow-lg overflow-y-auto h-full max-h-[90vh] gap-1 sticky top-20 max-md:top-16 max-md:py-2">
      <div className="font-bold text-4xl mb-2 text-indigo-700 max-md:hidden">
        Tops
      </div>
      <div className="flex flex-col max-md:flex-row gap-1 overflow-y-auto h-full">
        <ShowComponent />
      </div>
    </div>
  );
}
