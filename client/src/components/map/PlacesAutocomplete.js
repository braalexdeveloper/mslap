import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Combobox, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { url_place } from "../../utils/config";

export const PlacesAutocomplete = (props) => {
  const { input, setInput, loaded, map, setMap } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    setMap({
      ...map,
      currentLocation: { lat, lng },
    });
    setInput({
      ...input,
      location: `${url_place}${lat},${lat},${map.zoom}z?entry=ttu`,
    });
  };

  return (
    loaded && (
      <Combobox onChange={handleSelect}>
        <Combobox.Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          displayValue={!ready}
          className="combobox-input"
          placeholder="Search an address"
        />
        {value ? (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setValue("")}
          >
            <Combobox.Options id="combobox-list">
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <Combobox.Option
                    className="combobox-option"
                    key={place_id}
                    value={description}
                  >
                    {description}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        ) : null}
      </Combobox>
    )
  );
};
