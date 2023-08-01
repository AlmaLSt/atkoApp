document.getElementById('regist-client').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const formData = new FormData(event.target);

  const formObject = {};
  formData.forEach((value, key) => {
      if (key === 'edad') {
          formObject[key] = parseInt(value); 
      } else {
          formObject[key] = value;
      }
  });

  fetch('http://localhost:8080/api/v1/clients', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);

      localStorage.setItem('clientId', data.id);

     
      const alertMessage = 'Cliente registrado exitosamente!';
      const alertType = 'success';
      appendAlert(alertMessage, alertType);

      document.getElementById('regist-client').reset();

      setTimeout(() => {
          window.location.href = 'homeClients.html';
      }, 1000); 
  })
  .catch(error => {
      console.error('Error:', error);

      const alertMessage = 'Ha ocurrido un error, vuelve a intentarlo.';
      const alertType = 'danger';
      appendAlert(alertMessage, alertType);
  });
});


const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible" role="alert">
          <div>${message}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
  `;

  document.getElementById('liveAlertPlaceholder').appendChild(wrapper);
};