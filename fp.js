function createCityInfo(csv) {
  const cities = csv
    .split("\n")
    .filter((line) => /^[^#].*/.test(line) && line.trim() !== "")
    .map((line) => {
      const parts = line.split(",");
      return {
        x: parseFloat(parts[0]),
        y: parseFloat(parts[1]),
        name: parts[2],
        population: parseInt(parts[3]),
      };
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .reduce((acc, line, index) => {
      acc[line.name] = { population: line.population, rating: index + 1 };
      return acc;
    }, {});

  return function enrichText(text) {
    return Object.keys(cities).reduce((enrichedText, cityName) => {
      const { population, rating } = cities[cityName];
      const replacement = `${cityName} (${rating} місце в ТОП-10 найбільших міст України, населення ${population} чоловік)`;
      return enrichedText.replace(new RegExp(cityName), replacement);
    }, text);
  };
}

let csv = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.15,28.41,Вінниця,356665,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,#Бердянськ,121692,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментарі :)`;

const enrichFunction = createCityInfo(csv);
const enrichedText = enrichFunction("Вінниця - is cool!");
console.log(enrichedText);
