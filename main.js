let data = {
    name: "john",
    id: "55kk99"
};

console.log(data);
localStorage.setItem('user',JSON.stringify(data));



document.cookie = `userInfo=${data.name}; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
const cookies = document.cookie;
console.log(cookies)


// pva_jopUEClWPD     (same user id for device, go check on other device)
// pva_jopUEClWPD