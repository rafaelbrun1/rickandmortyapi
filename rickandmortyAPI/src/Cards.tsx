import { Circle } from "phosphor-react";
import { useEffect, useState } from "react";
import { DataProps } from "./App";
import api from "./services/api";

interface Data {
  data: DataProps;
}

export function Cards({ data }: Data) {
  const ApiEpURL = data.episode[0];
  const [url, setNewUrl] = useState<string>();

  useEffect(() => {
    api
      .get(ApiEpURL)
      .then((response) => {
        setNewUrl(response.data.name);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className="lg:w-[36rem] md:w-[36rem] w-[25rem] h-[13.75rem] bg-[#3C3E44] rounded-md drop-shadow-xl flex items-center overflow-hidden">
      <div className="w-56 h-[13.75rem]">
        <img src={data.image} />
      </div>

      <div className="p-3 flex flex-col gap-6 ">
        <div className="flex flex-col">
          <strong className="lg:text-lg text-white text-base ">
            {data.name}
          </strong>
          <div className="flex items-center gap-2">
            {data.status === "Alive" ? (
              <Circle color="green" size={8} weight="fill" />
            ) : data.status === "Dead" ? (
              <Circle color="red" size={8} weight="fill" />
            ) : (
              <Circle color="yellow" size={8} weight="fill" />
            )}
            <span className="lg:text-base text-sm text-white">
              {data.status} - {data.species}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="lg:text-base text-sm text-[#9E9E9E] bold">
            Last Known Location:
          </span>
          <span className="lg:text-base text-sm text-white">
            {data.location.name}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="lg:text-base text-sm  text-[#9E9E9E] bold">
            First seen in:
          </span>
          <span className="lg:text-base text-sm text-white">{url}</span>
        </div>
      </div>
    </div>
  );
}
