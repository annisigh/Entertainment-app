import { useEffect, useState } from "react"; //useEffect and useState are imported from React, which are used for handling side effects and managing state, respectively.
//useFetchTrendingMedia is imported from a custom service file tmdb.service, which is likely a hook that fetches trending media data from The Movie Database (TMDB) API.
import { useFetchTrendingMedia } from "../service/tmdb.service";
// SingleCard is imported from a component file, which is used to render individual media cards.
import SingleCard from "../components/SingleCard";
import { DNA } from "react-loader-spinner"; //DNA is imported from react-loader-spinner, which is a loading spinner component.

const Home = () => {
  //The useFetchTrendingMedia hook is used to fetch trending media data.
  // Fetch trending media hook
  const fetchTrendingMedia = useFetchTrendingMedia;

  //Two state variables are defined using the useState hook:
  // trendingData: an array to hold the trending media data
  // recommendedData: an array to hold the recommended media data

  // State variables to hold trending and recommended media data
  const [trendingData, setTrendingData] = useState(null);
  const [recommendedData, setrecommendedData] = useState(null);
  //Both state variables are initialized to null, indicating that the data hasn't been fetched yet.

  //The useEffect hook is used to fetch the trending and recommended
  // media data after a 2-second delay. This is done to simulate a loading delay.

  // Fetch trending and recommended media after 2 seconds of component mount
  useEffect(() => {
    setTimeout(() => {
		
      //Inside the useEffect hook, the fetchTrendingMedia function is called twice, once for trending media and once for recommended media. The function takes two arguments:

      // 1 or 2: likely an identifier for the type of media to fetch (trending or recommended)
      //setTrendingData or setrecommendedData: the state update function to update the corresponding state variable with the fetched data
      // Fetch trending media
      fetchTrendingMedia(1, setTrendingData);
      // Fetch recommended media
      fetchTrendingMedia(2, setrecommendedData);
    }, 2000);
  }, [fetchTrendingMedia]); // Dependency array with fetchTrendingMedia ensures useEffect runs only when fetchTrendingMedia changes

  return (
    <>
      {/* Conditional rendering based on availability of trendingData and recommendedData */}
      {trendingData && recommendedData ? (
        <>
          {/* Trending media section */}
          <p className="text-HeadingM font-light md:font-normal lg:font-light lg:text-HeadingL">
            Trending
          </p>
          <div className="w-full h-1/3 flex items-center justify-evenly md:h-2/5 ">
            <div className="w-full h-full py-4 overflow-x-auto flex flex-nowrap scroll-smooth scrollbar-none  ">
              {/* Mapping over trendingData to render SingleCard components */}
              {trendingData?.map((mediaInfo) => (
                <div
                  key={mediaInfo.id}
                  className="w-4/5 flex-none mx-2 md:w-2/5 md:mx-4 lg:w-1/3"
                >
                  <SingleCard mediaData={mediaInfo} fieldType={"trending"} />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended media section */}
          <p className="text-HeadingM font-light mb-2 md:font-normal lg:text-HeadingL lg:font-light lg:mt-5">
            Recommended For You
          </p>
          <div className="w-full h-5/6 flex flex-wrap items-center   ">
            {/* Mapping over recommendedData to render SingleCard components */}
            {recommendedData?.map((mediaInfo) => (
              <div
                key={mediaInfo.id}
                className="w-[47%] mx-1 my-5 h-1/3 md:w-[30%] md:h-1/2 md:mx-2 md:my-3 lg:w-[23%] lg:h-2/5"
              >
                <SingleCard mediaData={mediaInfo} fieldType={"recommended"} />
              </div>
            ))}
          </div>
        </>
      ) : (
        // Loading spinner when data is being fetched
        <div className="w-full h-4/5 flex items-center justify-center">
          <DNA height={100} width={100} />
        </div>
      )}
    </>
  );
};

export default Home;
