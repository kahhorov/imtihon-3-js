//html elements
const list = document.querySelector(".list");
const input = document.querySelector("#input");
let usersArr = [];
//jsonplaceholderdan  ma'lumotlarni olish
async function getUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("xatolik:" + res.status);
    }
    const data = await res.json();
    usersArr = data;
    createUi(usersArr);
  } catch (error) {
    alert(error.message);
  }
}
getUser();
//search
let time;
input.addEventListener("input", () => {
  clearTimeout(time);
  time = setTimeout(() => {
    list.innerHTML = "";
    const search = usersArr.filter((user) => {
      return user.name.toLowerCase().includes(input.value.toLowerCase());
    });
    if (search.length === 0) {
      list.innerHTML = `<h1 class="find">Ma'lumot topilmadi!</h1>`;
    }
    createUi(search);
  }, 300);
});
//serverdagi ma'lumotlarni Ui ga chiqarish
function createUi(users) {
  users.forEach(({ name, email, address, phone, website }) => {
    const li = document.createElement("li");
    const nameEl = document.createElement("h4");
    const emailEl = document.createElement("p");
    const phoneEl = document.createElement("p");
    const addressEl = document.createElement("p");
    const websiteEl = document.createElement("p");
    //serverni ma'lumotlarini elementlarga qo'shish
    nameEl.innerHTML = name;
    emailEl.innerHTML = `<span class="text">Email: </span>` + email;
    phoneEl.innerHTML = `<span class="text">Phone: </span>` + phone;
    addressEl.innerHTML = `<span class="text">City: </span>` + address.city;
    websiteEl.innerHTML = `<span class="text">Website: </span>` + website;
    li.append(nameEl, emailEl, phoneEl, addressEl, websiteEl);
    list.append(li);
  });
}
