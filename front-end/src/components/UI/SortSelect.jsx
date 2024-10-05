import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { id: "popularity.desc", name: "Popularity (High to Low)" },
  { id: "popularity.asc", name: "Popularity (Low to High)" },
  { id: "vote_average.desc", name: "Rating (High to Low)" },
  { id: "vote_average.asc", name: "Rating (Low to High)" },
  { id: "release_date.desc", name: "Release Date (Newest First)" },
  { id: "release_date.asc", name: "Release Date (Oldest First)" },
];

export default function SortSelect({ selectedSort, setSelectedSort }) {
  const selectedOption = sortOptions.find(
    (option) => option.id === selectedSort
  );

  return (
    <Listbox
      className="w-full flex justify-start"
      value={selectedSort}
      onChange={setSelectedSort}
    >
      <div className="relative w-full">
        <ListboxButton className="relative w-full lg:w-[50%] cursor-default rounded-full bg-transparent border-slate-500 py-3 pl-3 pr-10 text-left text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block text-white truncate">
              {selectedOption ? selectedOption.name : "Sort By"}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full lg:w-[50%] overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {sortOptions.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.id} // Use option.id as the value
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-200 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {option.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
