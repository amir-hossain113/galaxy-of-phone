// getting data from url
const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();

    displaySearchResult(data.data);
}

// showing data on the website
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add("col");
        // if(phones.length <= 20){
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        // }
    })
}


const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.data.slug);
}
