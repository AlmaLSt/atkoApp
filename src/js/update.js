document.addEventListener('DOMContentLoaded', async function () {
  try {
      const professionalId = localStorage.getItem('professionalId');
      if (!professionalId) {
          throw new Error('Professional ID not found');
      }

      const professionalData = await getProfessionalData(professionalId);
      populateUpdateForm(professionalData);
  } catch (error) {
      console.error('Error fetching professional data:', error);
      const alertMessage = 'An error occurred while fetching professional data.';
      const alertType = 'danger';
      appendAlert(alertMessage, alertType);
  }
});

document.getElementById('update-professional').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formObject = {};
  formData.forEach((value, key) => {
      formObject[key] = value;
  });

  try {
      const professionalId = localStorage.getItem('professionalId');
      if (!professionalId) {
          throw new Error('Professional ID not found');
      }

      formObject.id = professionalId;

      const updateResponse = await fetch(`http://localhost:8080/api/v1/professionals/${professionalId}`, {
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
          console.log('Professional updated:', updateData);
      } else {
          console.warn('Response does not contain valid JSON data:', updateResponse);
      }

      const alertMessage = 'Professional information updated successfully!';
      const alertType = 'success';
      appendAlert(alertMessage, alertType);

      setTimeout(() => {
          window.location.href = 'homeProfessionals.html';
      }, 3000); 
  } catch (error) {
      console.error('Error updating professional data:', error);

      const alertMessage = 'An error occurred while updating professional data.';
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

async function getProfessionalData(professionalId) {

  const response = await fetch(`http://localhost:8080/api/v1/professionals/${professionalId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch professional data');
  }
  const data = await response.json();
  return data;
}

function populateUpdateForm(professionalData) {
  document.getElementById('floatingName').value = professionalData.name;
  document.getElementById('floatingAge').value = professionalData.edad;
  document.getElementById('floatingPhone').value = professionalData.telefono;
  document.getElementById('floatingInput').value = professionalData.email;
  document.getElementById('floatingZone').value = professionalData.areaTrabajo;
  document.getElementById('floatingSelect').value = professionalData.category;
}