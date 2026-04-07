//required params
var website = document.getElementById("exampleFormControlInput1");
var utmSource = document.getElementById("validationServer01");
var utmMedium = document.getElementById("validationServer02");
var utmCampaign = document.getElementById("validationServer03");

//optional params
var utmTerm = document.getElementById("validationServer04");
var utmContent = document.getElementById("validationServer05");
var utmSourcePlatform = document.getElementById("validationServer06");
var utmCreativeFormat = document.getElementById("validationServer07");
var utmMarketingTactic = document.getElementById("validationServer08");

var myString = "";
var counter = 0;
var mci = "";

var channel = document.getElementById("channel");
channel.addEventListener('click', () => {
  console.log("clicked " + channel.value);

  if (channel.value === '1') {
    console.log("Paid Search clicked");
    //utmMedium.value = "affiliate";
    //utmMedium.style.color = "blue";
    mci = "sea";
  }
  else if (channel.value === '2') {
    console.log("Paid Shopping clicked");
    mci = "psh";
  }
  else if (channel.value === '3') {
    console.log("Paid Social Media clicked");
    mci = "psm";
  }
  else if (channel.value === '4') {
    console.log("Cross-Network clicked");
    mci = "cnm";
  }
  else if (channel.value === '5') {
    console.log("Organic Social Media clicked");
    mci = "osm";
  }
  else if (channel.value === '6') {
    console.log("Organic Search clicked");
    mci = "seo";
  }
  else if (channel.value === '7') {
    console.log("CRM clicked");
    mci = "crm";
  }
  else if (channel.value === '8') {
    console.log("Display clicked");
    mci = "dim";
  }
  else if (channel.value === '9') {
    console.log("Affiliate clicked");
    mci = "aff";
  }
  else if (channel.value === '10') {
    console.log("Video clicked");
    mci = "vid";
  }
  else if (channel.value === '11') {
    console.log("Jobportal clicked");
    mci = "job";
  }
  else if (channel.value === '13') {
    console.log("Paid Shopping clicked");
    mci = "int";
  }
});

// concatenate all values
document.querySelector("button.btn.btn-primary").addEventListener("click", function(event) {
  myString = "";
  console.log("Button was clicked!");
  //if (/^http[^#\?]+\?/.test(url)) {
  // is url
  //const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\?[a-zA-Z0-9-]+)?\/?$/;
  if (website.value.length > 0 && utmSource.value.length > 0 && utmMedium.value.length > 0 && utmCampaign.value.length > 0) {
    // for sure validation must be better, when hover outside of input-field
    console.log("all the required params are filled");
    if (website.value.startsWith("http://") || website.value.startsWith("https://")) {
      console.log("protocol ok");
      if (website.value.includes('?')) {
        console.log("with questionmark");
        myString = (website.value + "&mci=" + mci + "&utm_source=" + utmSource.value + "&utm_medium=" + utmMedium.value + "&utm_campaign=" + utmCampaign.value + ((!!utmTerm.value) ? ("&utm_term=" + utmTerm.value) : "") + ((!!utmContent.value) ? ("&utm_content=" + utmContent.value) : "") + ((!!utmSourcePlatform.value) ? ("&utm_source_platform=" + utmSourcePlatform.value) : "") + ((!!utmCreativeFormat.value) ? ("&utm_creative_format=" + utmCreativeFormat.value) : "") + ((!!utmMarketingTactic.value) ? ("&utm_marketing_tactic=" + utmMarketingTactic.value) : ""));
        myString = myString.replaceAll(" ", "+");
        console.log(myString);
        addRowToTable(myString);
      }
      else {
        console.log("no questionmark");
        var myString = (website.value + "?mci=" + mci + "&utm_source=" + utmSource.value + "&utm_medium=" + utmMedium.value + "&utm_campaign=" + utmCampaign.value + ((!!utmTerm.value) ? ("&utm_term=" + utmTerm.value) : "") + ((!!utmContent.value) ? ("&utm_content=" + utmContent.value) : "") + ((!!utmSourcePlatform.value) ? ("&utm_source_platform=" + utmSourcePlatform.value) : "") + ((!!utmCreativeFormat.value) ? ("&utm_creative_format=" + utmCreativeFormat.value) : "") + ((!!utmMarketingTactic.value) ? ("&utm_marketing_tactic=" + utmMarketingTactic.value) : ""));
        myString = myString.replaceAll(" ", "+");
        console.log(myString);
        addRowToTable(myString);
      }
    }
  }
  else
    alert("not all the required params are filled");// mark red the missing required fields, maybe with some hints
});


// Function to add a single row to the table
function addRowToTable(item) {
  counter++;
  // Get a reference to the table body
  var tableBody = document.getElementById("tableBody");

  // Create a new row
  var row = document.createElement("tr");

  //set date in specific format
  var date = new Date();
  var formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  //set time in specific format
  var formattedTime = date.toLocaleTimeString();

  // Create cells for each data item
  var countCell = document.createElement("td");
  countCell.textContent = counter;
  var urlCell = document.createElement("td");
  urlCell.textContent = item;
  var dateCell = document.createElement("td");
  dateCell.textContent = formattedDate;
  var timeCell = document.createElement("td");
  timeCell.textContent = formattedTime;

  // Append cells to the row
  row.appendChild(countCell);
  row.appendChild(urlCell);
  row.appendChild(dateCell);
  row.appendChild(timeCell);

  // Append the row to the table body
  tableBody.appendChild(row);
}

//export content of the whole table into the PDF file (format, play around with output)
document.querySelector("button.btn.btn-secondary").addEventListener("click", function(event) {
  var element = document.getElementById("table");
  html2pdf(element);
});

//clear table values
document.querySelector("button.btn.btn-outline-info").addEventListener("click", function(event) {
  document.getElementById("tableBody").innerHTML = "";
  counter = 0;
});

//revert order of table elements in rows, from ascending to descending
document.querySelector("#table > thead > tr > th:nth-child(4)").addEventListener("click", function(event) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
});

//export to .csv file, recreate to excel file
document.querySelector("button.btn.btn-success").addEventListener("click", function() {
  const table = document.getElementById("table");
  const rows = table.querySelectorAll("tr");
  let csv = [];
  for (let i = 0; i < rows.length; i++) {
    const row = [], cols = rows[i].querySelectorAll("td, th");
    //save only the second column (URL)
    row.push(cols[1].innerText);
    //if also separate utm, then add this
    //row.push(cols[4].innerText); and other utm [],[6]...
    csv.push(row.join(""));
  }
  const csvContent = csv.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "table.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

//dynamically format table if exported with separate utm parameters
var checkbox = document.querySelector('#flexCheckDefault');
checkbox.onchange = function(val) {
  if (checkbox.checked) {
    //show separate utm values, add new columns
    console.log('checked');
  }
  else {
    //set visibility hidden on that rows
    console.log('unchecked');
  }
}

//questionmark - more info
var qButton = document.getElementsByClassName('bi-question-circle')[0];
qButton.addEventListener('click', () => {
  console.log('questionmark clicked');
});
