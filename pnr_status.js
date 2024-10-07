const menuBtn = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");
const sidebar = document.getElementById("sidebar");
const loader = document.getElementById("loader");
const PNRstatusBtn = document.getElementById("PNRstatusBtn");
const trainInfoContainer = document.getElementById("train-info-container");
const PNRInput = document.getElementById("PNRInput");
const errorMessage = document.getElementById("error-message");
let PNRnumber;
PNRInput.addEventListener("input", (e) => {
  PNRnumber = e.target.value;
});

// menu open close....................
function menuOpenClose() {
  sidebar.classList.toggle("hidden");
  menuBtn.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
}
menuBtn.addEventListener("click", menuOpenClose);
closeMenu.addEventListener("click", menuOpenClose);

// fetch PNR status from api ...................
PNRstatusBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (PNRnumber == null || PNRnumber.length < 10) {
    errorMessage.innerText = "Please enter Valid PNR ";
    return;
  }
  // console.log(PNRnum)
  const url = `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${PNRnumber}`;
  const options = {
    method: "GET",
    headers: {
      //   "x-rapidapi-key": "b16d0f8b66msh453867ffc9ef598p16e494jsn6b5be6773ef8",
      "x-rapidapi-key": "7ee1ff6601msh3cab77fcefd2954p1eae34jsnfd842a6670ba",
      "x-rapidapi-host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    loader.classList.remove("hidden");
    trainInfoContainer.innerHTML = "";
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data);
    const {
      Pnr,
      TrainNo,
      TrainName,
      Doj,
      From,
      To,
      ReservationUpto,
      BoardingPoint,
      Class,
      PassengerStatus: [
        { Number, BookingStatus, CurrentStatus, CoachPosition },
      ],

      BookingFare,
      ChartPrepared,
    } = result.data;
    loader.classList.add("hidden");
    let newelement = document.createElement("div");
    newelement.innerHTML = `
     <h2 class="text-center text-xl mb-3">You Queried For : PNR Number: ${Pnr}</h2>
     <div class="w-[910px] mx-auto overflow-x-auto">
            <table class="p-2 w-full">
              <tr class="bg-orange-400 text-white">
                <th class="border-2 border-gray-200 p-2">Train Number</th>
                <th class="border-2 border-gray-200 p-2">Train Name</th>
                <th class="border-2 border-gray-200 p-2">
                  Bording Date <br />
                  (DD-MM-YYYY)
                </th>
                <th class="border-2 border-gray-200 p-2">From</th>
                <th class="border-2 border-gray-200 p-2">To</th>
                <th class="border-2 border-gray-200 p-2">Reserved Upto</th>
                <th class="border-2 border-gray-200 p-2">Boarding Point</th>
                <th class="border-2 border-gray-200 p-2">Class</th>
              </tr>
              <tr class="bg-white">
                <td class="border-2 border-gray-200 p-2 text-center">${TrainNo}</td>
                <td class="border-2 border-gray-200 p-2 text-center">
                  ${TrainName}
                </td>
                <td class="border-2 border-gray-200 p-2 text-center">
                 ${Doj}
                </td>
                <td class="border-2 border-gray-200 p-2 text-center">${From}</td>
                <td class="border-2 border-gray-200 p-2 text-center">${To}</td>
                <td class="border-2 border-gray-200 p-2 text-center">${ReservationUpto}</td>
                <td class="border-2 border-gray-200 p-2 text-center">${BoardingPoint}</td>
                <td class="border-2 border-gray-200 p-2 text-center">${Class}</td>
              </tr>
            </table>
            <table class="p-2 w-full mt-5">
              <tr class="bg-orange-400 text-white">
                <th class="border-2 border-gray-200 p-2 text-left">S. No.</th>
                <th class="border-2 border-gray-200 p-2 text-left">
                  Booking Status ( Quota , Coach No , Berth No.)
                </th>
                <th class="border-2 border-gray-200 p-2 text-left">
                  *Current Status (Quota , Coach No , Berth No.)
                </th>
                <th class="border-2 border-gray-200 p-2 text-left">
                  Coach Position
                </th>
              </tr>
              <tr class="bg-white">
                <td class="border-2 border-gray-200 p-2 text-center">
                  Passenger ${Number}
                </td>
                <td class="border-2 border-gray-200 p-2 text-center">
                  ${BookingStatus}
                </td>
                <td class="border-2 border-gray-200 p-2 text-center">${CurrentStatus}</td>
                <td class="border-2 border-gray-200 p-2 text-center"> ${
                  CoachPosition == null && ""
                } </td>
              </tr>
            </table>
            <table class="p-2 mt-5">
              <tr class="bg-orange-400 text-white">
                <th class="border-2 border-gray-200 p-2 text-left">
                  Total Fare
                </th>
                <th class="border-2 border-gray-200 p-2 text-left">
                  Charting Status
                </th>
              </tr>
              <tr class="bg-white">
                <td class="border-2 border-gray-200 p-2 text-center">${BookingFare} </td>
                <td class="border-2 border-gray-200 p-2 text-center">
                 ${ChartPrepared ? "Chat Prepared" : "Chart Not Prepared"}
                </td>
              </tr>
            </table>
          </div>`;
    errorMessage.innerText = "";
    trainInfoContainer.appendChild(newelement);
  } catch (error) {
    loader.classList.add("hidden");
    console.error(error);
  }
});
