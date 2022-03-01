// getting data from url
const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();

    displaySearchResult(data.data.slice(0,20));

}


// showing data on the website
const errorMsg = document.getElementById('error-msg');
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if(phones.length == 0){
        errorMsg.innerHTML = `
        <p class="text-center">❌ Error! Phone not found</p>
        `;
    }
    else{
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add("col");
            div.innerHTML = `
            <div class="card h-100 border border-2 border-info border rounded-top shadow-lg">
                <img src="${phone.image}" class="card-img-top h-75 w-50 mx-auto mt-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${phone.phone_name}</h5>
                    <p class="card-text text-center">${phone.brand}</p>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary border border-2 border-secondary d-block mx-auto">Details</button>
                </div>
            </div>
            `;

            searchResult.appendChild(div);
            errorMsg.innerHTML = '';
            
        })
    }
    
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
    const otherDetails = phone.others ? phone.others : ''
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
    <div class="card border border-2 border-info border rounded-top shadow-lg">
        <img src="${phone.image}" class="card-img-top h-75 w-50 mx-auto mt-2" alt="...">
        <div class="card-body">
            <h3 class="card-title text-center">${phone.name}</h3>
            <p class="card-text text-center">${phone.releaseDate ? phone.releaseDate : 'No release date found of this phone'}</p>
            <h5>Main Features:</h5>
            <h6>ChipSet: <span class="text-secondary">${phone.mainFeatures.chipSet}</span></h6>
            <h6>Display size: <span class="text-secondary">${phone.mainFeatures.displaySize}</span></h6>
            <h6>Memory: <span class="text-secondary">${phone.mainFeatures.memory}</span></h6>
            <h6>Storage: <span class="text-secondary">${phone.mainFeatures.storage}</span></h6>
            <br>
            <h5>Sensors:</h5>
            <h6>${phone.mainFeatures.sensors}</h6>
            <br>
            <h5>Other Features:</h5>
            <h6>Bluetooth: <span class="text-secondary">${otherDetails.Bluetooth ? otherDetails.Bluetooth : 'No'}</span></h6>
            <h6>GPS: <span class="text-secondary">${otherDetails.GPS ? otherDetails.GPS : 'No'}</span></h6>
            <h6>NFC: <span class="text-secondary">${otherDetails.NFC ? otherDetails.NFC : 'No'}</span></h6>
            <h6>Radio: <span class="text-secondary">${otherDetails.Radio ? otherDetails.Radio : 'No'}</span></h6>
            <h6>USB: <span class="text-secondary">${otherDetails.USB ? otherDetails.USB : 'No'}</span></h6>
            <h6>WLAN: <span class="text-secondary">${otherDetails.WLAN ? otherDetails.WLAN : 'No'}</span></h6>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}