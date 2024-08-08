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
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                     
                        <div class="row-first">
                           <div class="train-name"><h2> ${train.train_name} (${
              train.train_number
            })</h2></div>   <div class="flex-container">
                           <div class="train-run">Runs On:${train.run_days.map(
                             (days) => days
                           )}</div>
                           <div class="train-schedule" onClick="showSchedule(${
                             train.train_number
                           })">Train Schedule</div>
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
                            <div class="to-station-details">${train.to_std}| ${
              train.to_station_name
            }|</div> </div>
                        </div>
                       <div class="row-third">
                       <div class="class-type">${train.class_type
                         .map(
                           (type) =>
                             ` <div class="box" onClick='CheckAvailableSeat(event,${JSON.stringify(
                               train
                             )})' >${type}</div>`
                         )
                         .join("")}</div>
                      </div>
                       <div class="book-btn">
                       <button>Book Now</button>
                         </div>                  
                      
                    `;
            resultDiv.appendChild(card);
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
// get train schedule .....................................
async function showSchedule(trainNumber) {
  const url = `https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule?trainNo=${trainNumber}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7ee1ff6601msh3cab77fcefd2954p1eae34jsnfd842a6670ba",
      "x-rapidapi-host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
// checkAvailableSeat ..................................
async function CheckAvailableSeat(event, train) {
  event = event || window.event;
  console.log(event);

  const url = `https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability?classType=${event.target.value}&fromStationCode=${train.from}&quota=GN&toStationCode=${train.to}&trainNo=${train.train_number}&date=${journeyDate}'`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7ee1ff6601msh3cab77fcefd2954p1eae34jsnfd842a6670ba",
      "x-rapidapi-host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
