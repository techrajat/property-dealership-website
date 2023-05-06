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
              localStorage.setItem("selected", selected); // This will store 'selected' in the buffer even if the page is reloaded.
              // Note: localStorage stores only strings and not objects, hence we parsed selected to string.
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
          localStorage.setItem("selAgent", selAgent);
        };
        finalAgent("http://127.0.0.1:3000/agent");
      })
    });
  });
}

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
    selected = JSON.parse(selected); // We parsed 'selected' back to an object.
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

    // This way we can send a variable to backend JS :-
    // Sending 'selAgent' to backend :-
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

    // Sending 'selected' to backend :-
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

const housesForRent=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.housesForRent thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">City</th>
    <th scope="col">Locality</th>
    <th scope="col">Space (BHK)</th>
    <th scope="col">Amount (Lacs)</th>
    <th scope="col">Reg. Date</th>
    <th scope="col">Contact Seller</th>
  </tr>`;
  let row = document.querySelector('.houseRent');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.city}</td>
                        <td>${element.locality}</td>
                        <td>${element['space (BHK)']}</td>
                        <td>${element['amount (Lacs)']}</td>
                        <td>${element.date.substring(0, 10)}</td>
                        <td>${element.prop_id}</td>
                      </tr>`;
  });
}

const houseCost=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.housesCost thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">City</th>
    <th scope="col">Locality</th>
    <th scope="col">Amount (Lacs)</th>
  </tr>`;
  let row = document.querySelector('.houseCost');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.city}</td>
                        <td>${element.locality}</td>
                        <td>${element['amount (Lacs)']}</td>
                      </tr>`;
  });
}

const addressLocality=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.addressLocality thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">City</th>
    <th scope="col">Locality</th>
    <th scope="col">Amount (Lacs)</th>
  </tr>`;
  let row = document.querySelector('.adLocality');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.city}</td>
                        <td>${element.locality}</td>
                        <td>${element['amount (Lacs)']}</td>
                      </tr>`;
  });
}

const agentPropSold=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.agentMostProp thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">Name</th>
    <th scope="col">Total Amount</th>
  </tr>`;
  let row = document.querySelector('.agentProp');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.name}</td>
                        <td>${element.total_amount}</td>
                      </tr>`;
  });
}

const agentYear=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.agentPropYear thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">Name</th>
    <th scope="col">Avg. Selling Price (&#8377)</th>
  </tr>`;
  let row = document.querySelector('.agentYear');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.agent_name}</td>
                        <td>${element.avg_selling_price.toFixed(2)}</td>
                      </tr>`;
  });
}

const expHouse=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  document.querySelector('.expHouse thead').innerHTML = 
  `<tr>
    <th scope="col">S. No.</th>
    <th scope="col">City</th>
    <th scope="col">Locality</th>
    <th scope="col">Space (BHK)</th>
    <th scope="col">Amount (Lacs)</th>
    <th scope="col">Status</th>
  </tr>`;
  let row = document.querySelector('.expensiveHouse');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.city}</td>
                        <td>${element.locality}</td>
                        <td>${element.status}</td>
                        <td>${element['space (BHK)']}</td>
                        <td>${element['amount (Lacs)']}</td>
                      </tr>`;
  });
}

const sqlQuery=async(url)=>{
  const data = await fetch(url);
  const parsedData = await data.json();
  const columnNames = Object.keys(parsedData[0]);
  columnNames.forEach((element)=>{
    document.querySelector('.query thead tr').innerHTML += `<th scope="col">${element}</th>`;
  });
  let row = document.querySelector('.querySql');
  parsedData.forEach((element, index)=>{
    row.innerHTML += `<tr id="row${index}"></tr>`;
    let td = document.querySelector(`#row${index}`);
    columnNames.forEach((ele)=>{
      td.innerHTML += `<td>${element[ele]}</td>`;
    });
  });
}

if(document.querySelector('.housesForRent'))
{
  housesForRent("http://127.0.0.1:3000/q1");
  houseCost("http://127.0.0.1:3000/q2");
  addressLocality("http://127.0.0.1:3000/q3");
  agentPropSold("http://127.0.0.1:3000/q4");
  agentYear("http://127.0.0.1:3000/q5");
  expHouse("http://127.0.0.1:3000/q6");
  sqlQuery("http://127.0.0.1:3000/queryRes");
}

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

const username=async(url)=>{
  let data = await fetch(url);
  let parsedData = await data.json();
  if(parsedData){
    document.querySelector('#username').innerHTML = parsedData[0].name;
    document.querySelector('.loginout').innerHTML = `<li><a class="dropdown-item" href="/logout">Logout</a></li>`;
  }
};
username('http://127.0.0.1:3000/username');

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

const wrongPhone=async(url)=>{
  let data = await fetch(url);
  let parsedData = await data.json();
  if(parsedData)
    document.querySelector('#wrongData').innerHTML = '<p>Phone number is not registered!</p>';
};
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