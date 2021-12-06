const $ = (e) => document.querySelector(e);
const $s = (e) => document.querySelectorAll(e);

function findpilots() {
    fetch(`http://ergast.com/api/f1/2021/drivers.json`)
        .then(response => response.json())
        .then(json => {

            let drivers = json.MRData.DriverTable.Drivers;
            let aDrivers = drivers.slice();
            aDrivers.splice(5, 1);

            $(".row").innerHTML = ``;

            for (let i in drivers) {
                $(".row").innerHTML += `
                <div class="col-4 d-flex flex-column">
                    <div class="card">
                        <div class="image">
                            <img class="img-fluid" src='./assets/images/${aDrivers[i].driverId}.png'>
                        </div>
                        <div class="bottom pb-2">
                            <div class="d-flex flex-column align-items-start mt-2 px-3">
                                <h4 class="pName">${aDrivers[i].givenName}</h4>
                                <h3 class="pFName">${aDrivers[i].familyName}</h3>
                            </div>
                            <div class="d-flex justify-content-end px-3">
                                <h3 class="pCode mx-2">${aDrivers[i].code}</h3>
                                <h3 class="pNumber">${aDrivers[i].permanentNumber}</h3>
                            </div>
                                <hr class="w-90">
                            <div>
                                <div class="row">
                                    <div class="col d-flex flex-column justify-content-center">
                                        <h3>
                                            ${aDrivers[i].nationality}
                                        </h3>
                                        <h3>
                                            Age: <span>${getAge(aDrivers[i].dateOfBirth)}</span></br>
                                        </h3>
                                    </div>
                                    <div class="col">
                                        <img class="f1logo" src="./assets/images/formula1.png">
                                    </div>
                                </div>
                                <a target='_blank' href='${aDrivers[i].url}'>Wikipedia</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        })
}

function getAge(dob) {

    let date = new Date;

    let dobYear = dob.split('-')[0];
    let dobDay = dob.split('-')[2];
    let dobMonth = dob.split('-')[1];

    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();

    let rYear = year - dobYear;

    if (month != dobMonth) {
        if (dobMonth < month) {
            console.log(`Já fez aniversário: ${rYear}`)
        }
    } else if (dobMonth == month) {
        if (dobDay <= day) {
            console.log(`Já fez aniversário: ${rYear}`)
        } else {
            console.log('Ainda não chegou o aniversário.')
        }
    } return rYear;

}

setTimeout(findpilots, 1500);
