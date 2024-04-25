import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import IDropdownList from "../interfaces/IDropdownList";
import masterDataService from "../services/masterDataService";

interface ICateDDL {
  value: number | string | null;
  onChange: (val: IDropdownList) => void | undefined;
}

export default function CategoryAutocomplete({ value, onChange }: ICateDDL) {
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState<IDropdownList[]>([]);
  const [selected, setSelected] = useState<IDropdownList | null>(null);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? source
      : source.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    const init = async () => {
      const data = await masterDataService.getCategories();
      setSource(data);
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (value) {
      const obj = source.find((e) => e.id === value);
      setSelected(obj);
    }
  }, [value, source]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="relative focus-visible:ring-0">
        <Combobox value={selected} onChange={onChange}>
          <div className="relative focus:ring-0 focus-visible:ring-0">
            <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left shadow-md focus:outline-none focus-visible:ring-0 focus-visible:ring-white/75 focus-visible:ring-offset-0 sm:text-sm focus:ring-0">
              <Combobox.Input
                className="w-full rounded appearance-none border py-2 px-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                displayValue={(source: IDropdownList) => source?.name || ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow ring-0 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((source) => (
                    <Combobox.Option
                      key={source.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={source}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {source.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-indigo-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  }
}

const Loading = () => {
  return (
    <div className="relative focus-visible:ring-0">
      <Combobox disabled={true}>
        <div className="relative focus:ring-0 focus-visible:ring-0">
          <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left shadow-md focus:outline-none focus-visible:ring-0 focus-visible:ring-white/75 focus-visible:ring-offset-0 sm:text-sm focus:ring-0">
            <Combobox.Input className="w-full rounded appearance-none border py-2 px-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none" />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-200 fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </Combobox.Button>
          </div>
        </div>
      </Combobox>
    </div>
  );
};
