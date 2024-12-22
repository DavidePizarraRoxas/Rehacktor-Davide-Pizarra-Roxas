import DropDownsGenres from "./DropDownsGenres";
import DropDownsPlatforms from "./DropDownsPlatforms";

export default function DropdownMain() {
      return (
            <div className="mt-52 flex flex-col items-center">

                  <div className="mb-5">
                        <h2 className=" text-center font-bold text-medium mb-2 ">Genres</h2>
                        <DropDownsGenres />
                  </div>
                  <div>
                  <h2 className=" text-center font-bold text-medium mb-2 ">Platforms</h2>
                        <DropDownsPlatforms />
                  </div>

            </div>

      )
}