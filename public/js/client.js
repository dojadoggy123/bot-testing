let data = {
    name: "bob",
    id: "123abc"
};

localStorage.setItem('john', 'cenaaaa')
localStorage.setItem('user',JSON.stringify(data));

 
// retrieve user id from local storage. Go check with other devices
let user_id = localStorage.getItem("https://web.powerva.microsoft.com/")
if (user_id) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
  } else { 
    console.log('No data found');
  }

  
document.cookie = `userInfo=${data.name}; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
const cookies = document.cookie;
console.log(cookies)


// Add an event listener to the button
document.getElementById('chatbotButton').addEventListener('click', function() {
  // Show the chatbot container
  document.getElementById('chatbotContainer').style.display = 'block';
});
