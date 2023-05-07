// Template for displaying properties
const resItem1=(type, space, amount, city, locality, status, extra, id, num, str)=>{
  return `<div class="resCard1 card" style="width: 18rem;">
  <img src="https://loremflickr.com/320/240/${str}?random=${num}" class="card-img-top" alt="img">
  <div class="card-body">
    <h5 class="card-title"><span id="propSpace">${space}-BHK</span> ${type}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${city}, ${locality}</h6>
    <span>Price: &#8377 ${amount} Lacs</span><br>
    <span style="font-weight: bold;">${status}</span><br>
  </div>
  </div>`;
};
const resItem2=(type, space, amount, city, locality, status, extra, id, num, str)=>{
  return `<div class="resCard2 card" style="width: 18rem;">
  <img src="https://loremflickr.com/320/240/${str}?random=${num}" class="card-img-top" alt="img">
  <div class="card-body">
    <h5 class="card-title"><span id="propSpace">${space}-BHK</span> ${type}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${city}, ${locality}</h6>
    <span>Price: &#8377 ${extra} Lacs</span><br>
    <span>${status}</span><br>
    <a href="/reqAgent" class="btn btn-primary mt-3 mybtn" id="btn${id}">Buy</a>
  </div>
  </div>`;
};

const commItem1=(type, space, amount, city, locality, status, extra, id, num, str)=>{
  return `<div class="commCard1 card" style="width: 22rem;">
  <img src="https://loremflickr.com/320/240/${str}?random=${num}" class="card-img-top" alt="img">
  <div class="card-body">
    <h5 class="card-title"><span id="propSpace">${space}-sq ft</span> ${type}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${city}, ${locality}</h6>
    <span>Price: &#8377 ${amount} Crores</span><br>
    <span style="font-weight: bold;">${status}</span><br>
  </div>
  </div>`;
};
const commItem2=(type, space, amount, city, locality, status, extra, id, num, str)=>{
  return `<div class="commCard2 card" style="width: 22rem;">
  <img src="https://loremflickr.com/320/240/${str}?random=${num}" class="card-img-top" alt="img">
  <div class="card-body">
    <h5 class="card-title"><span id="propSpace">${space}-sq ft</span> ${type}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${city}, ${locality}</h6>
    <span>Price: &#8377 ${extra} Crores</span><br>
    <span>${status}</span><br>
    <a href="/reqAgent" class="btn btn-primary mt-3 mybtn" id="btn${id}">Buy</a>
  </div>
  </div>`;
};

// Fetch residential property details
const fetchResData=async(url, className, resItem)=>{
let data = await fetch(url);
let parsedData = await data.json();
parsedData.forEach((element, index)=>{
  if(element.type == 'Flat')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "hotel-room");
  if(element.type == 'Mansion')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "mansion");
  if(element.type == 'Builder Floor')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "apartment");
  if(element.type == 'Farm House')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "farm-house");
  if(element.type == 'Serviced Apartment')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "hotel-room");
  if(element.type == 'Studio Apartment')
  document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "dining,bedroom/all");
  if(element.type == 'House')
    document.querySelector(className).innerHTML += resItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "house,home/all");
  });
};

// Fetch commercial property details
const fetchCommData=async(url, className, commItem)=>{
  let data = await fetch(url);
  let parsedData = await data.json();
  parsedData.forEach((element, index)=>{
    if(element.type == 'Ready to Move Office' || element.type == 'Bare Shell Office')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "office,work/all");
    if(element.type == 'Plot')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "land,agriculture/all");
  if(element.type == 'Retail Shop')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "shop");
  if(element.type == 'Warehouse' || element.type == 'Factory')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "factory,manufacturing/all");
  if(element.type == 'Cold Storage')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "storage");
  if(element.type == 'Hotel' || element.type == 'Guest House')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "hotel,family/all");
  if(element.type == 'Banquet Hall')
    document.querySelector(className).innerHTML += commItem(element.type, element.space, element.amount, element.city, element.locality, element.status, element.extra, index, (index+1), "banquet,marriage/all");
});
};

if(document.querySelector('.main'))
{
fetchResData("http://127.0.0.1:3000/resData", ".main", resItem1);
fetchCommData("http://127.0.0.1:3000/commData", ".main", commItem1);
}

if(document.querySelector('.searchResults'))
{
fetchResData("http://127.0.0.1:3000/searchResult", ".searchResults", resItem1);
fetchCommData("http://127.0.0.1:3000/searchResult", ".searchResults", commItem1);
}

// Show properties according to the applied filter
if(document.querySelector('.filterBody'))
{
const getFilter=async()=>{
  let type = await fetch("http://127.0.0.1:3000/sendType");
  type = await type.text();
  if(type == 'Residential')
  {
    fetchResData("http://127.0.0.1:3000/filter", ".filterBody", resItem2).then(()=>{
      let selected;
      let btn = document.querySelectorAll('.mybtn');
      btn.forEach((element)=>{
        element.addEventListener('click', ()=>{
          let id = element.id;
          let num = parseInt(id.match(/\d+(\.\d+)?/g));
          const finalSelect=async(url)=>{
            let data = await fetch(url);
            let parsedData = await data.json();
            selected = JSON.stringify(parsedData[num]);
            // Store the selected property in the buffer
            localStorage.setItem("selected", selected);
          };
          finalSelect("http://127.0.0.1:3000/finalData");
        })
      });
    }).catch(()=>{
      console.log("Error");
    })
  }
  else
  {
    fetchCommData("http://127.0.0.1:3000/filter", ".filterBody", commItem2).then(()=>{
      let selected;
      let btn = document.querySelectorAll('.mybtn');
      btn.forEach((element)=>{
        element.addEventListener('click', ()=>{
          let id = element.id;
          let num = parseInt(id.match(/\d+(\.\d+)?/g));
          const finalSelect=async(url)=>{
            let data = await fetch(url);
            let parsedData = await data.json();
            selected = JSON.stringify(parsedData[num]);
            localStorage.setItem("selected", selected);
          };
          finalSelect("http://127.0.0.1:3000/finalData");
        })
      });
    }).catch(()=>{
      console.log("Error");
    })
  }
};
getFilter();
}

// Function for fetching the details of the available agents
const retrieveAgent=async(url)=>{
const data = await fetch(url);
const parsedData = await data.json();
let row = document.querySelector('.agentRow');
parsedData.forEach((element, index)=>{
  row.innerHTML += `<tr>
                      <th scope="row">${index+1}</th>
                      <td>${element.name}</td>
                      <td>${element.agent_id}</td>
                      <td>${element.num_prop_sold}</td>
                      <td>${element.avg_amt}</td>
                      <td class="chooseAgent" id="agent${index}"><a href="/confirm">Confirm</a></td>
                    </tr>`;
});
}

if(document.querySelector('.agentDetails'))
{
retrieveAgent("http://127.0.0.1:3000/agent").then(()=>{
  let selAgent;
  let btn = document.querySelectorAll('.chooseAgent');
  btn.forEach((element)=>{
    element.addEventListener('click', ()=>{
      let id = element.id;
      let num = parseInt(id.match(/\d+(\.\d+)?/g));
      const finalAgent=async(url)=>{
        let data = await fetch(url);
        let parsedData = await data.json();
        selAgent = JSON.stringify(parsedData[num]);
        // Store the details of the selected agent in the buffer
        localStorage.setItem("selAgent", selAgent);
      };
      finalAgent("http://127.0.0.1:3000/agent");
    })
  });
});
}

// Display final amount to the user
if(document.querySelector('#amount'))
{
let buyerMobile, prop_type;
const getBuyerContact=async(url1, url2)=>{
  let data1 = await fetch(url1);
  buyerMobile = await data1.text();
  let data2 = await fetch(url2);
  prop_type = await data2.text();
}
getBuyerContact("http://127.0.0.1:3000/getBuyer", "http://127.0.0.1:3000/sendType").then(()=>{
  let selected = localStorage.getItem("selected");
  selected = JSON.parse(selected);
  let ist = new Date(selected.date);
  let timezoneOffset = ist.getTimezoneOffset();
  ist.setMinutes(ist.getMinutes() - timezoneOffset);
  selected.date = ist;
  selected.buyer_id = buyerMobile;
  selected.prop = prop_type;
  if(prop_type == 'Residential')
    document.querySelector('#amount').innerHTML = `Amount to be paid: <span class="badge bg-success">&#8377 ${selected.extra} Lacs /-</span>`;
  else
    document.querySelector('#amount').innerHTML = `Amount to be paid: <span class="badge bg-success">&#8377 ${selected.extra} Crores /-</span>`;
}).catch(()=>{
  console.log("Error");
});
}

// Display the receipt and the details of the property bought by the user
if(document.querySelector('.finalReceipt'))
{
let buyerMobile, prop_type;
const getBuyerContact=async(url1, url2)=>{
  let data1 = await fetch(url1);
  buyerMobile = await data1.text();
  let data2 = await fetch(url2);
  prop_type = await data2.text();
}
getBuyerContact("http://127.0.0.1:3000/getBuyer", "http://127.0.0.1:3000/sendType").then(()=>{
  let selected = localStorage.getItem("selected");
  selected = JSON.parse(selected);
  let ist = new Date(selected.date);
  let timezoneOffset = ist.getTimezoneOffset();
  ist.setMinutes(ist.getMinutes() - timezoneOffset);
  selected.date = ist;
  selected.buyer_id = buyerMobile;
  selected.prop = prop_type;
  let selAgent = localStorage.getItem("selAgent");
  selAgent = JSON.parse(selAgent);
  if(prop_type == 'Residential')
  {
    document.querySelector('#productInfo').innerHTML = 
     `<pre><strong style="font-size: large; color: green;">Property Details</strong></pre>
      <pre>Property type           -   ${selected.type}</pre>
      <pre>Space                   -   ${selected.space} BHK</pre>
      <pre>City                    -   ${selected.city}</pre>
      <pre>Locality                -   ${selected.locality}</pre>
      <pre>Name of seller          -   ${selected.name}</pre>
      <pre>Contact no. of seller   -   ${selected.prop_id}</pre>
      <pre>Name of Agent           -   ${selAgent.name}</pre>
      <pre>Contact no. of agent    -   ${selAgent.agent_id}</pre>`;

    document.querySelector('#receipt').innerHTML = 
    `<strong style="font-size: large; color: gray;">Receipt</strong>
    <li class="list-group-item d-flex justify-content-between align-items-center">Price of property<span class="badge bg-primary">${selected.amount} Lacs /-</span></li>`;
    if(selected.extra != selected.amount)
    {
      document.querySelector('#receipt').innerHTML += 
      `<li class="list-group-item d-flex justify-content-between align-items-center">Price of furnishing<span class="badge bg-primary">${(selected.extra - selected.amount).toFixed(2)} Lacs /-</span></li>`;
    }
    document.querySelector('#receipt').innerHTML += 
    `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>Total</strong><span class="badge bg-success">${selected.extra} Lacs /-</span></li>`;
  }
  else
  {
    document.querySelector('#productInfo').innerHTML = 
     `<pre><strong style="font-size: large; color: green;">Property Details</strong></pre>
      <pre>Property type           -   ${selected.type}</pre>
      <pre>Space                   -   ${selected.space} sq ft</pre>
      <pre>City                    -   ${selected.city}</pre>
      <pre>Locality                -   ${selected.locality}</pre>
      <pre>Name of seller          -   ${selected.name}</pre>
      <pre>Contact no. of seller   -   ${selected.prop_id}</pre>
      <pre>Name of Agent           -   ${selAgent.name}</pre>
      <pre>Contact no. of agent    -   ${selAgent.agent_id}</pre>`;

      document.querySelector('#receipt').innerHTML = 
      `<strong style="font-size: large; color: gray;">Receipt</strong>
      <li class="list-group-item d-flex justify-content-between align-items-center">Price of property<span class="badge bg-primary">${selected.amount} Crores /-</span></li>`;
      if(selected.extra != selected.amount)
      {
        document.querySelector('#receipt').innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center">Price of furnishing<span class="badge bg-primary">${(selected.extra - selected.amount).toFixed(2)} Crores /-</span></li>`;
      }
      document.querySelector('#receipt').innerHTML += 
      `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>Total</strong><span class="badge bg-success">${selected.extra} Crores /-</span></li>`;
  }

  // Sending the selected agent to the backend
  fetch('/returnAgent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ selAgent })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  // Sending the selected property to the backend
  fetch('/returnSelected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ selected })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}).catch(()=>{
  console.log("Error");
});
}

// Fetch agent details in the agent office
const agentDetail=async(url)=>{
const data = await fetch(url);
const parsedData = await data.json();
let row = document.querySelector('.agentDetailsRow');
parsedData.forEach((element, index)=>{
  row.innerHTML += `<tr>
                      <th scope="row">${index+1}</th>
                      <td>${element.name}</td>
                      <td>${element.agent_id}</td>
                      <td>${element.num_prop_sold}</td>
                      <td>${element.avg_amt}</td>
                      <td class="details" id="detailAgent${index}"><a href="/detailsOfAgent">View More...</a></td>
                    </tr>`;
});
}

// Store the data of the selected agent in the buffer
if(document.querySelector('.showAgents'))
{
agentDetail("http://127.0.0.1:3000/agent").then(()=>{
  let viewAgent;
  let btn = document.querySelectorAll('.details');
  btn.forEach((element)=>{
    element.addEventListener('click', ()=>{
      let id = element.id;
      let num = parseInt(id.match(/\d+(\.\d+)?/g));
      const finalDetailsAgent=async(url)=>{
        let data = await fetch(url);
        let parsedData = await data.json();
        viewAgent = parsedData[num];
        localStorage.setItem("agentName", viewAgent.name);
        fetch('/viewAgentDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ viewAgent })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      };
      finalDetailsAgent("http://127.0.0.1:3000/agent");
    })
  });
});
}

// Function for showing the timeline of the transactions done by the selected agent
const agentTransDetail=async(url)=>{
const data = await fetch(url);
const parsedData = await data.json();
let row = document.querySelector('.agentTransDetails');
let agentName = localStorage.getItem("agentName");
document.querySelector(".transDetails caption").innerHTML = `Agent: <span style="color: red;">${agentName}</span>`;
parsedData.forEach((element, index)=>{
  let dateString = element.date;
  let date = new Date(dateString);
  let istDate = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  let ind = istDate.indexOf(",");
  if(ind !== -1)
    istDate = istDate.substring(0, ind);
  row.innerHTML += `<tr>
                      <th scope="row">${index+1}</th>
                      <td>${istDate}</td>
                      <td>${element.buyer_id}</td>
                      <td>${element.prop_id}</td>
                      <td>${element.type}</td>
                      <td>${element.amount}</td>
                    </tr>`;
});
}

if(document.querySelector(".transDetails"))
agentTransDetail("http://127.0.0.1:3000/getAgentDetails");

// Bootstrap function for form validation
(() => {
'use strict'
const forms = document.querySelectorAll('.needs-validation')
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)
})
})()

// Function for fetching the name of the logged-in user and displaying it in the navbar
const username=async(url)=>{
let data = await fetch(url);
let parsedData = await data.json();
if(parsedData){
  document.querySelector('#username').innerHTML = parsedData[0].name;
  document.querySelector('.loginout').innerHTML = `<li><a class="dropdown-item" href="/logout">Logout</a></li>`;
}
};
username('http://127.0.0.1:3000/username');

// Function for giving warning if the user already exists
const userExist=async(url)=>{
let data = await fetch(url);
let parsedData = await data.json();
if(parsedData)
{
  document.querySelector('#userExist').innerHTML = 'Phone number already registered!';
  document.querySelector('#loginHere').innerHTML = '<a href="/loginPage">Login here</a>';
}
};
if(document.querySelector('.registrationPage'))
userExist('http://127.0.0.1:3000/userExist');

// Function for giving warning if the user has entered a wrong phone number
const wrongPhone=async(url)=>{
let data = await fetch(url);
let parsedData = await data.json();
if(parsedData)
document.querySelector('#wrongData').innerHTML = '<p>Phone number is not registered!</p>';
};

// Function for giving warning if the user has entered wrong password
const wrongPass=async(url)=>{
let data = await fetch(url);
let parsedData = await data.json();
if(parsedData)
  document.querySelector('#wrongData').innerHTML = '<p>Wrong Password!</p>';
};

if(document.querySelector('.loginPage'))
{
wrongPhone('http://127.0.0.1:3000/wrongPhone');
wrongPass('http://127.0.0.1:3000/wrongPass');
}