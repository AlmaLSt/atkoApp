document.addEventListener('DOMContentLoaded', async function () {
    try {
       
        const clientId = localStorage.getItem('clientId');
        if (!clientId) {
            throw new Error('Client ID not found');
        }

        const clientData = await getClientData(clientId); 
        populateUpdateForm(clientData);
    } catch (error) {
        console.error('Error fetching client data:', error);
        const alertMessage = 'An error occurred while fetching client data.';
        const alertType = 'danger';
        appendAlert(alertMessage, alertType);
    }
});

document.getElementById('update-client').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    try {
     
        const clientId = localStorage.getItem('clientId');
        if (!clientId) {
            throw new Error('Client ID not found');
        }

    
        formObject.id = clientId;

        const updateResponse = await fetch(`http://localhost:8080/api/v1/clients/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        if (!updateResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = updateResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const updateData = await updateResponse.json();
            console.log('Client updated:', updateData);
        } else {
            console.warn('Response does not contain valid JSON data:', updateResponse);
        }

      
        const alertMessage = 'Información actualizada correctamente!';
        const alertType = 'success';
        appendAlert(alertMessage, alertType);

      
        setTimeout(() => {
            window.location.href = 'homeClients.html';
        }, 1000); 
    } catch (error) {
        console.error('Error updating client data:', error);

        
        const alertMessage = 'Ocurrió un error, vuelve a intentarlo';
        const alertType = 'danger';
        appendAlert(alertMessage, alertType);
    }
});


const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    const liveAlertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (liveAlertPlaceholder) {
        liveAlertPlaceholder.appendChild(wrapper);
    } else {
        console.error('liveAlertPlaceholder not found.');
    }
};


async function getClientData(clientId) {
   
    const response = await fetch(`http://localhost:8080/api/v1/clients/${clientId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch client data');
    }
    const data = await response.json();
    return data;
}


function populateUpdateForm(clientData) {

    document.getElementById('floatingName').value = clientData.name;
    document.getElementById('floatingAge').value = clientData.edad;
    document.getElementById('floatingPhone').value = clientData.telefono;
    document.getElementById('floatingInput').value = clientData.email;
}