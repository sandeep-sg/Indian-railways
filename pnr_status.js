document.getElementById("search-btn").addEventListener("click", async () => {
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  loader.style.display = "block";
  const pnrNumber = document.getElementById("pnr-input").value;
  const url = `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnrNumber}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b16d0f8b66msh453867ffc9ef598p16e494jsn6b5be6773ef8",
      "x-rapidapi-host": "irctc-indian-railway-pnr-status.p.rapidapi.com",
    },
  };
  try {
    resultDiv.innerHTML = ""
    const response = await fetch(url, options);
    const jsonData = await response.json();
    const data = jsonData.data;
    loader.style.display = "none";
    let tableContainer = document.createElement("div");

    tableContainer.classList.add("table-container");
    tableContainer.innerHTML = `<table id="train-details">
              <thead>
                  <tr>
                      <th>Train Number</th>
                      <th>Train Name</th>
                      <th>Boarding Date</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Reserved Up To</th>
                      <th>Boarding Point</th>
                      <th>Class</th>
                  </tr>
              </thead>
              <tbody>
              <tr>
               <td>${data.trainNumber}</td>
              <td>${data.trainName}</td>
              <td>${data.dateOfJourney}</td>
              <td>${data.boardingPoint}</td>
              <td>${data.destinationStation}</td>
              <td>${data.destinationStation}</td>
              <td>${data.boardingPoint}</td>
              <td>${data.journeyClass}</td>
              </tr>
              </tbody>
          </table>
  
          <table id="booking-status">
              <thead>
                  <tr>
                      <th>S No</th>
                      <th>Booking Status</th>
                      <th>Current Status</th>
                  </tr>
              </thead>
              <tbody>
              
               ${data.passengerList
                 .map((passenger) => {
                   return ` <tr><td>Passenger ${passenger.passengerSerialNumber}</td>
                 <td>${passenger.bookingStatusDetails}/${passenger.passengerQuota}</td>
                 <td>${passenger.currentStatusDetails}</td></tr> `;
                 })
                 .join("")}
             
              
              </tbody>
          </table>
  
          <table id="fare-chart">
              <thead>
                  <tr>
                      <th>Total Fare</th>
                      <th>Chart Status</th>
                  </tr>
              </thead>
              <tbody> <tr>
              <td>${data.ticketFare}</td>
              <td>${data.chartStatus}</td>
             
              </tr></tbody>
          </table>`;
    resultDiv.append(tableContainer);

    // Clear previous results
  } catch (error) {
    loader.style.display = "none";
    resultDiv.innerHTML = (
      "<span id='error'>Please fill correct pnr number</span>"
    );
    console.error(error);
  }
});
