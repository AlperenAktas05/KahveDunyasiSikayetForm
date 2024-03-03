document.addEventListener('DOMContentLoaded', () => {
    let tableBodyDOM = document.querySelector(".tableBody");

    fetch('http://localhost:3000/fetchData')
        .then(response => response.json())
        .then(data => {
            data.forEach(formObject => {
                let newForm = document.createElement("tr");

                newForm.innerHTML = `
                    <th scope="row">${formObject.ID}</th>
                    <td>${formObject.category}</td>
                    <td>${formObject.topic}</td>
                    <td>${formObject.city}</td>
                    <td>${formObject.nameSurname}</td>
                    <td>${formObject.email}</td>
                    <td>${formObject.phone}</td>
                    <td>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal${formObject.ID}" style="background-color: #005e5c;">
                        Detayları Gör
                        </button>
                        
                        <!-- Modal -->
                        <div class="modal fade" id="modal${formObject.ID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Müşteri Formu</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table mt-4">
                                    <tbody>
                                        <tr>
                                            <th scope="col">Kategori:</th>
                                            <td>${formObject.category}</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Konu:</th>
                                            <td>${formObject.topic}</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Şehir:</th>
                                            <td>${formObject.city}</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Ad Soyad:</th>
                                            <td>${formObject.nameSurname}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="col">Email:</th>
                                            <td>${formObject.email}</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Telefon:</th>
                                            <td>${formObject.phone}</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Mesaj:</th>
                                            <td><textarea class="p-2" cols="60px" rows="5px" readonly>${formObject.formText}</textarea></td>
                                        </tr>
                                        
                                        <tr>
                                            <th scope="col">Cevap:</th>
                                            <td><textarea class="p-2" cols="60" rows="5" placeholder="Cevap Yazınız"></textarea></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" style="background-color: #6c0c33;">Kapat</button>
                                <button type="button" class="btn btn-success sendResponseBtn" data-formid="${formObject.ID}" style="background-color: #005e5c;">Gönder</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                `;

                tableBodyDOM.appendChild(newForm);
            });

            let sendResponseBtns = document.querySelectorAll('.sendResponseBtn');

            sendResponseBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    let formId = btn.dataset.formid;
                    sendResponse(formId);
                });
            });

        })
        .catch(error => {
            console.error('Veritabanından bilgiler çekilirken bir hata oluştu:', error);
        });

        function sendResponse(formId) {
            const responseText = document.querySelector(`#modal${formId} textarea[placeholder="Cevap Yazınız"]`).value;

            console.log(`FormID: ${formId} için cevap gönderildi: ${responseText}`);

            fetch(`http://localhost:3000/delete/${formId}`, {
                method: 'DELETE',
                mode: 'cors',
            })
            .then(response => response.json())
            .then(data => {
                console.log(`Form ID ${formId} başarıyla silindi:`, data);
            })
            .catch(error => {
                console.error(`Form ID ${formId} silinirken bir hata oluştu:`, error);
            });
        }   
});
