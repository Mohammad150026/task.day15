const getCountryAndNeighbor = function (country) {
    // MD call for country
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      // Render country:
      renderCountry(data);
  
      //Get country neighbour
      let neighbour = 0;
      if (!data.borders) {
        return; // If no neighbour then simply return
      } else {
        for (let neighbour of data.borders) {
          //AJAX call for neighbour
          const requestNeighbour = new XMLHttpRequest();
          requestNeighbour.open(
            'GET',
            `https://restcountries.com/v3.1/alpha/${neighbour}` //alpha used in link instead of name bcz neighbour is the code
          );
          requestNeighbour.send();
  
          requestNeighbour.addEventListener('load', function () {
            const [dataNeighbour] = JSON.parse(this.responseText);
            // console.log(dataNeighbour);
            renderCountry(dataNeighbour);
          });
        }
      }
    });
  };
  
  const renderCountry = data => {
    const lang = Object.values(data.languages).join(',');
        const currencies = Object.values(data.currencies).map((currency) => currency.name).join(',');
        const borders = Object.values(data.borders).map(border => border).join(',' + ' ');
        
        const html = `
       
        <table>
<tr>
                <td>Country Flag:</td>
                <td><img src="${data.flags.png}"/></td>
            </tr>
            <tr>
                <td>Country Name:</td>
                <td>${data.name.common}</td>
            </tr>
            <tr>
                <td>Capital city:</td>
                <td>${data.capital}</td>
            </tr>
            <tr>
                <td>Region:</td>
                <td>${data.region}</td>
            </tr>
            <tr>
                <td>Continent:</td>
                <td>${data.continents}</td>
            </tr>
            <tr>
                <td>Borders:</td>
                <td>${borders}</td>
            </tr>
            <tr>
                <td>Population:</td>
                <td>${data.population} ~ ${+(data.population / 1000000).toFixed(1)} M</td>
            </tr>
            <tr>
                <td>Language: </td>
                <td> ${lang} </td>
            </tr>
            <tr>
                <td>Currency: </td>
                <td> ${currencies} </td>
            </tr>
        </table>
        <br/>
        `;
        const divEl = document.createElement('div');
        divEl.innerHTML = html;
        
        document.body.appendChild(divEl);
      
  };
// getCountryAndNeighbor('bangladesh');
// getCountryAndNeighbor('canada');
getCountryAndNeighbor('germany');
