// api key

async function locationData(loc) {
  const data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${loc}}&appid=c41ecc1335087d556ee87ffa89750cad`
  );
  const coordinates = await data.json();
  const lat = coordinates[0].lat;
  const lon = coordinates[0].lon;
  const countryCode = coordinates[0].country;
  const name = coordinates[0].name;
  return [lat, lon, countryCode, name];
}

async function weatherData() {
  const data = await locationData("Janopol Oriental, Tanauan city");
  const lat = data[0];
  const lon = data[1];
  const countryCode = data[2];
  const fullname = data[3];

  //   console.log(`${lat}\n${lon}\n${countryCode}\n${fullname}`);

  //   const conditionsFetch = await fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c41ecc1335087d556ee87ffa89750cad`
  //   );

  const currentConditionsFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c41ecc1335087d556ee87ffa89750cad`
  );
  const conditionJson = await currentConditionsFetch.json();
  console.log(conditionJson);
  return conditionJson;
}

weatherData();
