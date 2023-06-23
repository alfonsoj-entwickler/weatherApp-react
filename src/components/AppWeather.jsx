import Form from "./Form";
import Result from "./Result";
import Loading from "./Loading";
import useWeather from "../hooks/useWeather";

const AppWeather = () => {
  const { result, loading, noResult } = useWeather();
  return (
    <>
      <main className="grid-two">
        <Form />
        { loading ? <Loading /> :
         result?.name ? <Result /> :
         noResult ? <p>TThere are no results</p> :
         <p>The weather will be displayed here</p> }
      </main>
    </>
  );
};

export default AppWeather;
