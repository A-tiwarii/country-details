import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [region, setRegion] = useState("asia");
  const [country, setCountry] = useState("Malaysia");
  const [data, setData] = useState([]);
  const primaryAsia = "#2563EB";
  const primaryEurope = "#EF4444";
  const [selectedCountry, setSelectedCountry] = useState("Malaysia");

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, [region]);

  const [object, setObject] = useState(data[0]);

  function changeregion(e) {
    if (e.target.id === "asiabutton") {
      setSelectedCountry("Malaysia");
      setRegion("asia");
    } else {
      setSelectedCountry("Republic of Kosovo");
      setRegion("europe");
    }
  }

  function selectcountry(e, countryName) {
    setSelectedCountry(countryName);
    setCountry(e.target.id);
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ margin: "5%" }}>
        <h1>Select Regions</h1>
        <button
          onClick={changeregion}
          id="asiabutton"
          style={{ backgroundColor: `${primaryAsia}` }}
        >
          Asia
        </button>
        <br />
        <button
          onClick={changeregion}
          id="europebutton"
          style={{ backgroundColor: `${primaryEurope}` }}
        >
          Europe
        </button>
      </div>
      <div style={{ margin: "5%" }}>
        <h1>Countries Names</h1>
        <ul>
          {data.map((item) => (
            <li>
              <button
                onClick={(e) => selectcountry(e, item.name.official)}
                id={item.name.common}
                key={item.name.common}
                style={{
                  backgroundColor: `${
                    region === "asia" ? primaryAsia : primaryEurope
                  }`,
                  opacity: `${
                    selectedCountry === item?.name?.official ? 1 : 0.6
                  }`
                }}
              >
                {item.name.official} <img style={{width:"20px"}} src={item.flags.png} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ margin: "5%" }}>
        <h1>Cuntry details</h1>
        {data
          .filter((value) => {
            if (value.name.common == country) return value;
          })
          .map((item) => (
            <div id={item.name.common} key={item.name.common}>
              <br />
              <img style={{width:"100px"}} src={item.flags.png} />
               <h2>{item.name.common}({item.flag}) </h2>
               <p>{item.capital}</p>
               <br/>
              <button style={{margin:10,padding:10}}>
                "Demonym"
                <br />
                {item.demonyms.eng.f}
              </button>
              <button style={{margin:10,padding:10}}>
                "Calling Code"
                <br />
                {item.idd.root}{item.idd.suffixes}
              </button>
              <button style={{margin:10,padding:10}}>
                "Currency"
                <br />
                "Doller"
              </button>
              <button style={{margin:10,padding:10}}>
                "Population"
                <br />
                {item.population}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;