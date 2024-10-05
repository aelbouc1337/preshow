import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { genreListObjects } from "../../utils/genresList";

export default function GenreSelect({ selected, setSelected }) {
  const selectedGenre = genreListObjects.find((genre) => genre.id === selected);

  return (
    <Listbox
      className="w-full flex justify-end"
      value={selected}
      onChange={(id) => setSelected(id)}
    >
      <div className="relative w-full">
        <ListboxButton className="relative w-full lg:w-[50%] cursor-default rounded-full bg-transparent border-slate-500 py-3 pl-3 pr-10 text-left text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block text-white truncate">
              {selectedGenre ? selectedGenre.name : "Select a genre"}
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
          {genreListObjects.map((genre) => (
            <ListboxOption
              key={genre.id}
              value={genre.id} // Use genre.id as the value
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-200 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {genre.name}
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
