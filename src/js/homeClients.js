//Fetch categories
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/categories'); 
        const data = await response.json();

        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        let isFirstItem = true;

        data.forEach(category => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            if (isFirstItem) {
                carouselItem.classList.add('active');
                isFirstItem = false;
            }

            const img = document.createElement('img');
            img.src = 'https://images.unsplash.com/photo-1687042277586-971369d3d241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'; // Replace 'your_image_url_here' with the image URL for this category
            img.classList.add('d-block', 'w-100');
            img.alt = '...';

            const carouselCaption = document.createElement('div');
            carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

            const h5 = document.createElement('h5');
            h5.textContent = category.name;

            carouselCaption.appendChild(h5);
            carouselItem.appendChild(img);
            carouselItem.appendChild(carouselCaption);

            carouselInner.appendChild(carouselItem);

            const indicatorButton = document.createElement('button');
            indicatorButton.type = 'button';
            indicatorButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
            indicatorButton.setAttribute('data-bs-slide-to', carouselIndicators.children.length.toString());
            if (carouselIndicators.children.length === 0) {
                indicatorButton.classList.add('active');
            }
            carouselIndicators.appendChild(indicatorButton);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchCategories();

//Fetch all clients

async function fetchProfessionals() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/professionals'); 
        const data = await response.json();

        const cardsContainer = document.getElementById('cards-container');

        data.forEach(professional => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';

            const img = document.createElement('img');
            img.src = '/src/assets/avatar.png';
            img.classList.add('card-img-top');
            img.alt = 'avatar';

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const h5 = document.createElement('h5');
            h5.classList.add('card-title');
            h5.textContent = professional.name; 

            const age = document.createElement('p');
            age.classList.add('card-text');
            age.textContent = `Edad: ${professional.edad}`; 

            const contractDate = document.createElement('p');
            contractDate.classList.add('card-text');
            contractDate.textContent = `Zona: ${professional.areaTrabajo}`; 

            const status = document.createElement('p');
            status.classList.add('card-text');
            status.textContent = `Categoría: ${professional.category.name}`; 

            const reviewLink = document.createElement('a');
            reviewLink.href = '#';
            reviewLink.classList.add('btn', 'btn-primary');
            reviewLink.textContent = 'Contactar';

            cardBody.appendChild(h5);
            cardBody.appendChild(age);
            cardBody.appendChild(contractDate);
            cardBody.appendChild(status);
            cardBody.appendChild(reviewLink);

            card.appendChild(img);
            card.appendChild(cardBody);

            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchProfessionals();
