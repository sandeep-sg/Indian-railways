document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    const departureStation = document
      .getElementById("departureStation")
      .value.toUpperCase();
    const arrivalStation = document
      .getElementById("arrivalStation")
      .value.toUpperCase();
    const journeyDate = document.getElementById("journeyDate").value;
    const quota = document.getElementById("quota").value;
    console.log(quota);
    if (departureStation && arrivalStation && journeyDate) {
      const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${departureStation}&toStationCode=${arrivalStation}&dateOfJourney=${journeyDate}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b16d0f8b66msh453867ffc9ef598p16e494jsn6b5be6773ef8",
          "x-rapidapi-host": "irctc1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";

        if (result.data && result.data.length > 0) {
          result.data.forEach((train) => {
            console.log(train);
            resultDiv.innerHTML += `
                        <div class="card">  
                        <div class="row-first">
                           <div class="train-name"><h2> ${train.train_name} (${
              train.train_number
            })</h2></div>   <div class="flex-container">
                           <div class="train-run">Runs On:${train.run_days.map(
                             (days) => days
                           )}</div>
                           <div class="train-schedule"><a href="">Train Schedule</a></div>
                           </div>
                       </div>
                       <div class="row-second">
                            <div class="from-station-details">${
                              train.from_std
                            } | ${train.from_station_name} |</div>
                              <div class="flex-container">
                            <div class="duration">------ ${
                              train.duration
                            } ------</div>
                            <div class="to-station-details">${train.to_sta}| ${
              train.to_station_name
            }|</div> </div>
                        </div>
                       <div class="row-third">
                       <div class="class-type">${train.class_type.map(
                         (type) =>
                           ` <div class="box" onClick="CheckAvailabeSeat(${train})" >${type}</div>`
                       )}</div>
                      </div>
                       <div class="book-btn">
                       <button>Book Now</button>
                         </div>                  
                        </div>
                    `;
          });
        } else {
          resultDiv.innerHTML =
            '<p class="error-message">No trains found for the given stations and date.</p>';
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("result").innerHTML =
          '<p class="error-message">Error fetching data. Please try again later.</p>';
      }
    } else {
      document.getElementById("result").innerHTML =
        '<p class="error-message">Please enter departure station, arrival station, and date of journey.</p>';
    }
  });

function CheckAvailabeSeat(e) {
  console.log(e);
}
