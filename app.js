const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();

// Establish connection with mysql local server
const con = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: "project"
});
const hostname = '127.0.0.1';
const port = 3000;

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/index.html"));
});

let wrongPhone, wrongPass;
app.get('/loginPage', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/login/login.html"));
  wrongPhone = null;
  wrongPass = null;
});

let userExist;
app.get('/registerPage', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/login/register.html"));
  userExist = null;
});

app.post('/register', (req, res)=>{
  con.query(`insert into user values ('${req.body.firstName} ${req.body.lastName}', '${req.body.phone}', '${req.body.email}', '${req.body.password}')`, (err, rows)=>{
    if(err)
    {
      userExist = '1';
      res.sendFile(path.join(__dirname, "./template/login/register.html"));
    }
    else
    {
      res.sendFile(path.join(__dirname, "./template/login/login.html"));
      userExist = null;
    }
  })
});

app.get('/userExist', (req, res)=>{
  res.send(userExist);
});

// Match the phone and password of the user and also validate
let id, user;
app.post('/login', (req, res)=>{
  con.query(`select * from user where phone='${req.body.phone}'`, (err, row)=>{
    let response = row;
    if(!response.length)
    {
      wrongPhone = '1';
      wrongPass = null;
      res.sendFile(path.join(__dirname, "./template/login/login.html"));
    }
    else{
      wrongPhone = null;
      con.query(`select name, phone from user where phone='${req.body.phone}' and password='${req.body.password}'`, (err, rows)=>{
        response = rows;
        if(!response.length)
        {
          wrongPass = '1';
          res.sendFile(path.join(__dirname, "./template/login/login.html"));
        }
        else{
          wrongPass = null;
          user = rows;
          id = user[0].phone;
          res.sendFile(path.join(__dirname, "./template/index.html"));
        }
      })
    }
  });
});
app.get('/wrongPhone', (req, res)=>{
  res.send(wrongPhone);
});
app.get('/wrongPass', (req, res)=>{
  res.send(wrongPass);
});

app.get('/username', (req, res)=>{
  res.send(user);
});

app.get('/logout', (req, res)=>{
  user = [];
  res.sendFile(path.join(__dirname, "./template/index.html"));
});

// Send the residential property details
app.get('/resData', (req, res)=> {
  con.query("select prop_id, type, `space (BHK)` as space, `amount (Lacs)` as amount, city, locality, status from res_prop limit 100", (err, rows)=>{
    if(err)
    throw err;
    res.send(rows);
  });
});

// Send the commercial property details
app.get('/commData', (req, res)=>{
    con.query("select prop_id, type, `area (sq ft)` as space, `amount (Crore)` as amount, city, locality, status from comm_prop limit 100", (err, rows)=>{
        if(err)
          throw err;
        res.send(rows);
      });
});

// Filter the properties according to the city entered by the user
let searchResult;
app.post('/search', (req, res)=>{
  con.query(`select type, \`space (BHK)\` as space, \`amount (Lacs)\` as amount, city, locality, status from res_prop where city='${req.body.city}'`, (err, rows)=>{
    if(err)
      throw err;
    searchResult = rows;
  });
  con.query(`select type, \`area (sq ft)\` as space, \`amount (Crore)\` as amount, city, locality, status from comm_prop where city='${req.body.city}'`, (err, rows)=>{
    if(err)
      throw err;
    searchResult.push(rows);
  });
  res.sendFile(path.join(__dirname, ('./template/search/search.html')));
});

app.get('/searchResult', (req, res)=>{
  res.send(searchResult);
});

app.get('/buy', (req, res)=>{
  if(!user || !user.length)
    res.sendFile(path.join(__dirname, ('./template/login/login.html')));
  else
    res.sendFile(path.join(__dirname, ('./template/buyer/first.html')));
});

let type;
app.post('/type', (req, res)=>{
  type = req.body.resorcomm;
  if(req.body.resorcomm == 'Residential')
    con.query(`insert into res_buyer (buyer_id) values ('${id}')`, (err, rows)=>{
        res.sendFile(path.join(__dirname, "./template/buyer/second.html"));
    });
  else
    con.query(`insert into comm_buyer (buyer_id) values ('${id}')`, (err, rows)=>{
      res.sendFile(path.join(__dirname, "./template/buyer/third.html"));
    });
});

// Create a view "filter" in the database which will contain the properties filtered according to the user requirements
app.post('/pref', (req, res)=>{
  if(type == 'Residential')
  {
    con.query(`update res_buyer set name = '${user[0].name}', requirement = '${req.body.req}', city = '${req.body.city}', \`budget (Lacs)\` = ${parseInt(!req.body.budget?999999000:req.body.budget) / Math.pow(10, 5)}, f_status = '${req.body.fstatus}', buy_rent = '${req.body.buy_rent}' where buyer_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
    });

    con.query("CREATE VIEW filter (prop_id, name, type, space, amount, extra, city, locality, status, date) AS SELECT res_prop.prop_id, res_seller.name, res_prop.type, res_prop.`space (BHK)`, res_prop.`amount (Lacs)`, CASE WHEN res_buyer.f_status = 'Fully-Furnished' THEN res_seller.`amount (Lacs)-Fully F` WHEN res_buyer.f_status = 'Semi-Furnished' THEN res_seller.`amount (Lacs)-Semi F` ELSE res_seller.`amount (Lacs)-Non F` END AS extra, res_prop.city, res_prop.locality, res_prop.status, res_prop.date FROM res_prop INNER JOIN res_buyer ON res_buyer.requirement = res_prop.type AND res_buyer.city = res_prop.city AND res_buyer.`budget (Lacs)` >= res_prop.`amount (Lacs)` AND res_buyer.buy_rent = res_prop.status INNER JOIN res_seller ON res_prop.prop_id = res_seller.prop_id", (err, rows)=>{
      if(err)
        throw err;
      else
        res.sendFile(path.join(__dirname, ("./template/buyer/fourth.html")));
    });
  }
  else
  {
    con.query(`update comm_buyer set name = '${user[0].name}', requirement = '${req.body.req}', city = '${req.body.city}', \`budget (Crore)\` = ${parseInt(!req.body.budget?99999900000:req.body.budget) / Math.pow(10, 7)}, investment = '${req.body.invest}', buy_lease = '${req.body.buy_lease}' where buyer_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
    });

    con.query("CREATE VIEW filter (prop_id, name, type, space, amount, extra, city, locality, status, date) AS SELECT comm_prop.prop_id, comm_seller.name, comm_prop.type, comm_prop.`area (sq ft)`, comm_prop.`amount (Crore)`, CASE WHEN comm_buyer.investment = 'Food-Court' THEN comm_seller.`amount (Crore)-Food` WHEN comm_buyer.investment = 'Restaurant' THEN comm_seller.`amount (Crore)-rest` WHEN comm_buyer.investment = 'Multiplex' THEN comm_seller.`amount (Crore)-mul` ELSE comm_seller.`amount (Crore)` END AS extra, comm_prop.city, comm_prop.locality, comm_prop.status, comm_prop.date FROM comm_prop INNER JOIN comm_buyer ON comm_buyer.requirement = comm_prop.type AND comm_buyer.city = comm_prop.city AND comm_buyer.`budget (Crore)` >= comm_prop.`amount (Crore)` AND comm_buyer.buy_lease = comm_prop.status INNER JOIN comm_seller ON comm_prop.prop_id = comm_seller.prop_id", (err, rows)=>{
      if(err)
        throw err;
      else
        res.sendFile(path.join(__dirname, ("./template/buyer/fourth.html")));
    });
  }
});

app.get('/getBuyer', (req, res)=>{
  res.send(id);
});

app.get('/sendType', (req, res)=>{
  res.send(type);
});

let filter;
app.get('/filter', (req, res)=>{
  con.query("select prop_id, name, type, space, amount, extra, city, locality, status, date from filter", (err, rows)=>{
    if(err)
      throw err;
    else
    {
      filter = rows;
      res.send(rows);
      con.query("truncate res_buyer", (err, rows)=>{
        if(err)
        throw err;
      });
      con.query("truncate comm_buyer", (err, rows)=>{
        if(err)
        throw err;
      });
      con.query("drop view filter", (err, rows)=>{
        if(err)
        throw err;
      });
    }
  });
});

app.get('/reqAgent', (req, res)=>{
    res.sendFile(path.join(__dirname, "./template/buyer/fifth.html"));
});

app.get('/agent', (req, res)=>{
  con.query("select * from agent", (err, rows)=>{
    if(err)
      throw err;
    else
      res.send(rows);
  });
});

app.get('/finalData', (req, res)=>{
  res.send(filter);
});

app.get('/confirm', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/buyer/sixth.html"));
});

// Receiving the selected from frontend :- 
app.use(express.json());
let selAgent;
app.post('/returnAgent', (req, res) => {
  selAgent = req.body.selAgent;
});

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Receiving the selected property from frontend :- 
app.post('/returnSelected', (req, res) => {
  const selected = req.body.selected;
  let num_prop = selAgent.num_prop_sold;
  // Delete the property from the database once sold and enter the transaction details in the table "trans_rec"
  if(selected.prop == "Residential")
  {
    con.query(`delete from res_prop where prop_id = '${selected.prop_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`delete from res_seller where prop_id = '${selected.prop_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`insert into trans_rec values ('${selected.prop_id}', '${selAgent.agent_id}', '${selected.prop}', '${selected.extra * Math.pow(10, 5)}', '${selected.buyer_id}', '${year}-${month}-${day}')`, (err, rows)=>{
      if(err)
        throw err;
    });
    // Update the details of the agent who sold the property
    con.query(`update agent set avg_amt = (avg_amt * ${num_prop} + ${selected.extra * Math.pow(10, 5)}) / ${num_prop+1} where agent_id = '${selAgent.agent_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`update agent set num_prop_sold = num_prop_sold+1 where agent_id = '${selAgent.agent_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
  }
  else
  {
    con.query(`delete from comm_prop where prop_id = '${selected.prop_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`delete from comm_seller where prop_id = '${selected.prop_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`insert into trans_rec values ('${selected.prop_id}', '${selAgent.agent_id}', '${selected.prop}', '${(selected.extra * Math.pow(10, 7)).toFixed(2)}', '${selected.buyer_id}', '${year}-${month}-${day}')`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`update agent set avg_amt = (avg_amt * ${num_prop} + ${selected.extra * Math.pow(10, 7)}) / ${num_prop+1} where agent_id = '${selAgent.agent_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
    con.query(`update agent set num_prop_sold = num_prop_sold+1 where agent_id = '${selAgent.agent_id}'`, (err, rows)=>{
      if(err)
        throw err;
    });
  }
});

app.get('/sell', (req, res)=>{
  if(!user || !user.length)
    res.sendFile(path.join(__dirname, ('./template/login/login.html')));
  else
    res.sendFile(path.join(__dirname, './template/seller/first.html'));
});

app.post('/typeSeller', (req, res)=>{
  id = req.body.phone;
  type = req.body.resorcomm;
  if(req.body.resorcomm == 'Residential')
  {
    con.query(`insert into res_seller (prop_id) values ('${id}')`, (err, rows)=>{});
    con.query(`insert into res_prop (prop_id) values ('${id}')`, (err, rows)=>{
      res.sendFile(path.join(__dirname, "./template/seller/second.html"));
    });
  }
  else
  {
    con.query(`insert into comm_seller (prop_id) values ('${id}')`, (err, rows)=>{});
    con.query(`insert into comm_prop (prop_id) values ('${id}')`, (err, rows)=>{
      res.sendFile(path.join(__dirname, "./template/seller/third.html"));
    });
  }
});

// Insert the property details of the seller in the database
app.post('/prefSeller', (req, res)=>{
  if(type == 'Residential')
  {
    con.query(`update res_seller set name = '${user[0].name}', type = '${req.body.type}', \`space (BHK)\` = ${req.body.space}, city = '${req.body.city}', locality = '${req.body.locality}', \`amount (Lacs)-Non F\` = ${req.body.nonF}, \`amount (Lacs)-Semi F\` = ${req.body.semiF}, \`amount (Lacs)-Fully F\` = ${req.body.fullyF}, status = '${req.body.sell_rent}' where prop_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
    });

    con.query(`update res_prop set type = '${req.body.type}', \`space (BHK)\` = ${req.body.space}, city = '${req.body.city}', locality = '${req.body.locality}', \`amount (Lacs)\` = ${req.body.nonF}, status = '${req.body.sell_rent}', date = '${year}-${month}-${day}' where prop_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
      else
        res.sendFile(path.join(__dirname, "./template/seller/fourth.html"));
    });
  }
  else
  {
    con.query(`update comm_seller set name = '${req.body.name}', type = '${req.body.type}', \`area (sq ft)\` = ${req.body.space}, city = '${req.body.city}', locality = '${req.body.locality}', \`amount (Crore)\` = ${req.body.amount}, \`amount (Crore)-rest\` = ${req.body.rest}, \`amount (Crore)-mul\` = ${req.body.mul}, \`amount (Crore)-Food\` = ${req.body.food}, status = '${req.body.sell_lease}' where prop_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
    });

    con.query(`update comm_prop set type = '${req.body.type}', \`area (sq ft)\` = ${req.body.space}, city = '${req.body.city}', locality = '${req.body.locality}', \`amount (Crore)\` = ${req.body.amount}, status = '${req.body.sell_lease}', date = '${year}-${month}-${day}' where prop_id = '${id}'`, (err, rows)=>{
      if(err)
        throw err;
      else
        res.sendFile(path.join(__dirname, "./template/seller/fourth.html"));
    });
  }
});

// Fetch agent details for the agent office
app.get('/agentOffice', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/agentOffice/first.html"));
});

app.get('/detailsOfAgent', (req, res)=>{
  res.sendFile(path.join(__dirname, "./template/agentOffice/second.html"));
})

let viewAgent;
app.post('/viewAgentDetails', (req, res) => {
  viewAgent = req.body.viewAgent;
});

app.get('/getAgentDetails', (req, res)=>{
  con.query(`select * from trans_rec where trans_rec.agent_id = '${viewAgent.agent_id}'`, (err, rows)=>{
    if(err)
      throw err;
    else
      res.send(rows);
  })
});

// Start the server
app.listen(port, ()=>{
    console.log(`Server started successfully at http://${hostname}:${port}`);
});