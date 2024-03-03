let formCounter = 0;

document.querySelector(".submitButton").addEventListener("click", getForm);

async function getForm() {
    try {
        const response = await fetch('http://localhost:3000/fetchData');
        const data = await response.json();
        formCounter = data.length + 1;
        createForm();
    } catch (error) {
        console.error('Form sayısı alınırken bir hata oluştu:', error);
    }
}

function createForm() {

    let formCategoryDOM = document.querySelector(".formCategory");
    let formTopicDOM = document.querySelector(".formTopic");
    let formCityDOM = document.querySelector(".formCity");
    let formNameDOM = document.querySelector(".formName");
    let formEmailDOM = document.querySelector(".formEmail");
    let formPhoneDOM = document.querySelector(".formPhone");
    let formTextareaDOM = document.querySelector(".formTextarea");

    let formObject = {
        ID: formCounter,
        category: formCategoryDOM.value,
        topic: formTopicDOM.value,
        city: formCityDOM.value,
        nameSurname: formNameDOM.value,
        email: formEmailDOM.value,
        phone: formPhoneDOM.value,
        text: formTextareaDOM.value
    };

    insertDB(formObject);

    formCounter++;
}

function insertDB(formObject) {
    fetch('http://localhost:3000/insert', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form başarıyla eklendi:', data);
    })
    .catch(error => {
        console.error('Form eklenirken bir hata oluştu:', error);
    });
}
