import './App.css';

function App() {

  const requestBody = {
    "username": "Dino",
    "password": "1234"
  };

  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody),
    method: "post"
  })
  .then(response => Promise.all([response.json(), response.headers]))
  .then(([body, headers]) => {
    const authValu = headers.get("authorization");
    console.log(authValu);
    console.log(body);
  });

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
