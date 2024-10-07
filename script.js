const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const menuBtn = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");
const sidebar = document.getElementById("sidebar");
const errorMessage1 = document.getElementById("error-message1");
const errorMessage2 = document.getElementById("error-message2");
const trainInfoContainer = document.getElementById("train-info-container");
// menu show logic ..............
function menuOpenClose() {
  sidebar.classList.toggle("hidden");
  menuBtn.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
}
menuBtn.addEventListener("click", menuOpenClose);
closeMenu.addEventListener("click", menuOpenClose);

// get train data from api .....................
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let fromStationCode = document
    .getElementById("formStation")
    .value.toUpperCase();
  let toStationCode = document.getElementById("toStation").value.toUpperCase();
  let dateOfJourney = document.getElementById("date").value;
  if (fromStationCode == "") {
    errorMessage1.innerText = "Please enter Station code";
    return;
  } else {
    errorMessage1.innerText = "";
  }
  if (toStationCode == "") {
    errorMessage2.innerText = "Please enter Station code";
    return;
  } else {
    errorMessage2.innerText = "";
  }
  console.log(fromStationCode,toStationCode)
  const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStationCode}&toStationCode=${toStationCode}&dateOfJourney=${dateOfJourney}`;
  const options = {
    method: "GET",
    headers: {
      // "x-rapidapi-key": "b16d0f8b66msh453867ffc9ef598p16e494jsn6b5be6773ef8",
      "x-rapidapi-key": "7ee1ff6601msh3cab77fcefd2954p1eae34jsnfd842a6670ba",
      "x-rapidapi-host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    loader.classList.remove("hidden");
    trainInfoContainer.innerHTML = "";
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    const trainData = result.data;
    console.log(trainData)
    trainData.forEach((train) => {
      loader.classList.add("hidden");
      let div = document.createElement("div");
      div.innerHTML = `<div class="flex flex-col gap-4 w-[100%] mx-auto bg-white rounded p-5">
            <div class="flex justify-between">
              <h3 class=" font-bold text-lg">
              ${train.train_name} 
              ${train.train_number}
              </h3>
              <div class="flex justify-between min-w-fit">
              <div class="text-lg">Runs On:
              ${train.run_days.map((day) => day)}
             </div>
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-lg flex flex-col gap-0 md:gap-2 md:flex-row">
                <div> ${train.from_std}</div> 
                <div class="w-[1px] bg-gray-100"></div>
                <div> ${train.train_src}</div> 
                <div class="w-[1px] bg-gray-100"></div> 
                <div> ${train.train_date} </div>
              </div>       
                <div class="flex text-lg items-center gap-2">
                  <div class="w-12 h-0.5 bg-gray-400"></div>
                  <div>${train.duration}</div>
                  <div class="w-12 h-0.5 bg-gray-400"></div>
                </div>
                <div class="text-lg flex flex-col gap-0 md:gap-2  md:flex-row">
                <div> ${train.to_sta}</div> 
                <div class="w-[1px] bg-gray-100"></div>
                <div> ${train.train_dstn}</div> 
                <div class="w-[1px] bg-gray-100"></div> 
                <div> ${train.train_date} </div>
              </div>     
              </div>
            <div class="flex gap-2">
            ${train.class_type
              .map((type) => {
                return `<div class="border w-[200px] p-3 rounded bg-gray-50">
              <div class="text-bold">${type}</div>
            </div>`;
              })
              .join(" ")}   
            </div>
          </div>`;
      errorMessage1.innerText = "";
      errorMessage2.innerText = "";
      trainInfoContainer.appendChild(div);
    });
  } catch (error) {
    loader.classList.add("hidden");
    console.error(error);
    trainInfoContainer.innerHTML = "Not found";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const date = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  date.value = today;
});
