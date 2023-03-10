import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Weather from "../../components/Weather";
import Spinner from "../../components/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const clodlyImg =
    "https://images.unsplash.com/photo-1514632595-4944383f2737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYXRoZXIlMjBmb3JlY2FzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_KEY}`;
  // console.log(city)

  const getWeatherData = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        // console.log(res.data);
      })
      .catch((e)=>{
       console.log("The name you entered is not valid")
      })
    setCity(" ");
    setLoading(false);
  };

  {
    if (loading) {
      <Spinner />;
    } else {
      return (
        <>
          <Head>
            <title>Weather Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="absolute inset-0 bg-black/100 z-[1]">
            <Image
              src={clodlyImg}
              layout="fill"
              alt="weather change, with pictures"
              className="object-cover "
            />
          </div>
          <div className="relative flex flex-col justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
            <form
              onSubmit={getWeatherData}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded"
            >
              <div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent border-none text-black  focus:outline-none text-2xl placeholder:text-gray-500"
                  type="text"
                  placeholder="Search city"
                />
              </div>
              <button onClick={getWeatherData}>
                <BsSearch size={20} />
              </button>
            </form>
            {weather.main && <Weather data={weather} />}
          </div>
        </>
      );
    }
  }
}
