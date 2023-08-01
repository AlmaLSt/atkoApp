//Fetch categories
function fetchCategories() {
    fetch('http://localhost:8080/api/v1/categories')
      .then(response => response.json())
      .then(data => {
        const selectElement = document.getElementById('floatingSelect');
  
        selectElement.innerHTML = '';

        data.sort((a, b) => a.name.localeCompare(b.name));
  
        data.forEach(category => {
          const option = document.createElement('option');
          option.text = category.name;
          option.value = category.id;
          selectElement.appendChild(option);
        });

        window.categoriesList = data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

fetchCategories();
  
  //Post data professional

  document.getElementById('regist-professional').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    const formObject = {};
    formData.forEach((value, key) => {
      if (key === 'edad') {
        formObject[key] = parseInt(value); 
      } else if (key === 'category') {
        
        const selectedCategoryId = parseInt(value);
        const selectedCategory = window.categoriesList.find(category => category.id === selectedCategoryId);
        formObject[key] = selectedCategory;
      } else {
        formObject[key] = value;
      }
    });

    fetch('http://localhost:8080/api/v1/professionals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      localStorage.setItem('professionalId', data.id);
      // Show success alert
      const alertMessage = 'Profesional registrado exitosamente!';
      const alertType = 'success';
      appendAlert(alertMessage, alertType);
      

      document.getElementById('regist-professional').reset();
  
      setTimeout(() => {
        window.location.href = 'homeProfessionals.html';
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
   

