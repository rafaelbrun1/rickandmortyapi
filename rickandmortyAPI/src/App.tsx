import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Cards } from "./Cards";
import api from "./services/api";

export interface DataProps {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  url: string;
  created: string;
  episode: string[];
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<DataProps[]>([]);

  function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  let url = 1;

  function fetchData() {
    const allChars: DataProps[] = [];
    api.get(`/?page=${url}`).then((response) => {
      allChars.push(response.data.results);
      setData((oldChars) => [...oldChars, ...allChars.flat()]);
    });
    if (url <= 42) {
      url++;
    }
  }

  useEffect(() => {
    window.onscroll = function () {
      let d = document.documentElement;
      let offset = d.scrollTop + window.innerHeight;
      let height = d.scrollHeight;

      if (offset >= height) {
        fetchData();
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          type="text"
          placeholder="Pesquisar nome..."
          name="pesquisar"
          onChange={handleSearchTerm}
          className="my-20 w-96 bg-[#262626] placeholder:text-[#808080] placeholder:text-base rounded p-4 drop-shadow-md border border-[#0D0D0D] focus:outline-none focus:border focus:border-gray-600 text-[#F2F2F2]"
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {data
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((el) => {
            return <Cards key={el.id} data={el} />;
          })}
      </div>
    </div>
  );
}

export default App;
