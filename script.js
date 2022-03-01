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
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary border border-2 border-secondary">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

// getting single phone detail from url 
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();

    displayPhoneDetail(data.data);
}


// showing single phone detail on the website
const displayPhoneDetail = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${phone.name}</h3>
            <p class="card-text">${phone.releaseDate || 'No release date found of this phone'}</p>
            <h5>Main Features:</h5>
            <h6>ChipSet: <span class="text-secondary">${phone.mainFeatures.chipSet}</span></h6>
            <h6>Display size: <span class="text-secondary">${phone.mainFeatures.displaySize}</span></h6>
            <h6>Memory: <span class="text-secondary">${phone.mainFeatures.memory}</span></h6>
            <h6>Storage: <span class="text-secondary">${phone.mainFeatures.storage}</span></h6>
            <br>
            <h5>Sensors</h5>
            <br>
            <h5>Other Features:</h5>
            <h6>Bluetooth: <span class="text-secondary">${phone.others.Bluetooth}</span></h6>
            <h6>GPS: <span class="text-secondary">${phone.others.GPS}</span></h6>
            <h6>NFC: <span class="text-secondary">${phone.others.NFC}</span></h6>
            <h6>Radio: <span class="text-secondary">${phone.others.Radio}</span></h6>
            <h6>USB: <span class="text-secondary">${phone.others.USB}</span></h6>
            <h6>WLAN: <span class="text-secondary">${phone.others.WLAN}</span></h6>
            
        </div>
    `;
    phoneDetails.appendChild(div);
}