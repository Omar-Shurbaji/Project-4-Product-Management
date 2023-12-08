// get total 
// create product
// save localstorage 
// clear inputs
// read 
// count 
// delete 
// update 
// search 
// clean data

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let index;
// get total 

function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        if (result < 9999 & result > -9999) {
            total.innerHTML = `Total: ${result} $`;
            total.style.backgroundColor = "green";
        }
    } else {
        total.innerHTML = 'Total:';
        total.style.backgroundColor = "red";
    }
}

// create product
let dataTotal;
if (localStorage.product != null) {
    dataTotal = JSON.parse(localStorage.product);
}else {
    dataTotal = [];
}

submit.addEventListener('click', () => {
        if (title.value != '' & price.value != 0 & ads.value != 0 & taxes.value != 0 & discount.value != 0 & total.value != 0 & category.value != ''){
            let object = {
                title: title.value,
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count: count.value,
                category: category.value
            }
        if (submit.innerHTML == "Create") {
            // count 
            if (count.value > 1 & count.value <= 999) {
                for (let i = 0 ; i < count.value ; i++) {
                    dataTotal.push(object)
                }
                clearData();
            }else {
                dataTotal.push(object);
                clearData();
            }
        }else {
            dataTotal[index] = object;
            submit.innerHTML = "Create";
            count.style.display = "block";
            clearData();
        }
        // save localstorage 
        localStorage.setItem("product", JSON.stringify(dataTotal))
        }
        showData();
    }
)


// clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = 'Total:';
    total.style.backgroundColor = "red";
    count.value = '';
    category.value = '';
}


// read 

function showData() {
    let table = ``;
    for (let i = 0 ; i < dataTotal.length ; i++) {
        table += `
        <tr> 
            <td>${i+1}</td>
            <td>${dataTotal[i].title}</td>
            <td>${dataTotal[i].price} $</td>
            <td>${dataTotal[i].taxes} $</td>
            <td>${dataTotal[i].ads} $</td>
            <td>${dataTotal[i].discount} $</td>
            <td>${dataTotal[i].total.match(/\d+/ig)} $</td>
            <td>${dataTotal[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.querySelector(".deleteAll");
    if (dataTotal.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" id="deleteAll">Delete All (${dataTotal.length})</button>`;
    }else{
        btnDelete.innerHTML = ``;
    }
}
showData();


// delete 

function deleteData(i) {
    dataTotal.splice(i,1);
    localStorage.product = JSON.stringify(dataTotal);
    showData();
}

function deleteAll() {
    dataTotal= [];
    localStorage.product = JSON.stringify(dataTotal);
    showData();
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = "Total:";
    total.style.backgroundColor = "red";
    count.style.display = "block";
    submit.innerHTML = "Create";
}


// update 

function updateData(i) {
    title.value = dataTotal[i].title;
    price.value = dataTotal[i].price;
    taxes.value = dataTotal[i].taxes;
    ads.value = dataTotal[i].ads;
    discount.value = dataTotal[i].discount;
    category.value = dataTotal[i].category;
    gettotal();
    submit.innerHTML = "Update";
    count.style.display = "none";
    index = i;
    scroll({
        top: 0,
        behavior: "smooth"  // here or in html file
    });
    let tr = document.querySelector(".container .outputs table #tbody tr");
    tr.style.cssText = "top: 100%";
}

// This method is so that if all the fields are empty, the button returns to create
let input = document.querySelectorAll("input");
input.forEach( Element =>
    Element.onkeyup = () => {
        if (title.value == '' & price.value == '' & taxes.value == '' & ads.value == '' & discount.value == '' & category.value == '') {
            submit.innerHTML = 'Create';
            count.style.display = "block";
        }
        if (price.value !== '' || taxes.value !== ''||ads.value !== '' || discount.value !== '' ) {
            gettotal();
        }else{
            total.innerHTML = `Total:`;
            total.style.backgroundColor = "red";
        }
    }
)


// search
let search = document.querySelector("#search")
let searchByTitle = document.querySelector("#searchtitle");
let searchByCategory = document.querySelector("#searchcategory");
searchByTitle.addEventListener('click', function() {
    let searchValue = search.value;
    let table = '';
    for (let i = 0 ; i < dataTotal.length ; i++) {
        if (dataTotal[i].title.includes(searchValue)) {
            table += `
            <tr> 
                <td>${i+1}</td>
                <td>${dataTotal[i].title}</td>
                <td>${dataTotal[i].price} $</td>
                <td>${dataTotal[i].taxes} $</td>
                <td>${dataTotal[i].ads} $</td>
                <td>${dataTotal[i].discount} $</td>
                <td>${dataTotal[i].total.match(/\d+/ig)} $</td>
                <td>${dataTotal[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
        }
        let tr = document.querySelector(".container .outputs table #tbody tr");
        tr.style.cssText = "top: 100%";
        document.getElementById("tbody").innerHTML = table;
    }
})

searchByCategory.addEventListener('click', function() {
    let searchValue = search.value;
    let table = '';
    for (let i = 0 ; i < dataTotal.length ; i++) {
        if (dataTotal[i].category.includes(searchValue)) {
            table += `
            <tr> 
                <td>${i+1}</td>
                <td>${dataTotal[i].title}</td>
                <td>${dataTotal[i].price} $</td>
                <td>${dataTotal[i].taxes} $</td>
                <td>${dataTotal[i].ads} $</td>
                <td>${dataTotal[i].discount} $</td>
                <td>${dataTotal[i].total.match(/\d+/ig)} $</td>
                <td>${dataTotal[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
        }
        let tr = document.querySelector(".container .outputs table #tbody tr");
        tr.style.cssText = "top: 100%";
        document.getElementById("tbody").innerHTML = table;
    }
})

search.addEventListener('input', function() {
    if (search.value == '') {
        showData();
    }
});
