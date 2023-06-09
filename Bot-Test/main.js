let data = {
    name: "john",
    id: "55kk99"
};

console.log(data);
localStorage.setItem('user',JSON.stringify(data));


// retrieve user id from local storage. Go check with other devices
let user_id = localStorage.getItem("https://web.powerva.microsoft.com/")
if (user_id) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
  } else {
    console.log('No data found');
  }

  

console.log("pls work again!it    a ")
document.cookie = `userInfo=${data.name}; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
const cookies = document.cookie;
console.log(cookies)


// pva_jopUEClWPD     (same user id for device, go check on other device)
// pva_jopUEClWPD