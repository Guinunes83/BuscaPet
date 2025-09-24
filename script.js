document.addEventListener('DOMContentLoaded', () => {
    /* ---------------------------------- */
    /* LÓGICA DA GALERIA DE FOTOS (PÁGINA 01) */
    /* ---------------------------------- */
    const petData = {
        '1': { name: 'Caramelo', images: ['https://placedog.net/600/400?id=1', 'https://placedog.net/600/400?id=101', 'https://placedog.net/600/400?id=102'] },
        '2': { name: 'Flocos', images: ['https://placedog.net/600/400?id=2', 'https://placedog.net/600/400?id=103'] },
        '3': { name: 'Luna', images: ['https://placedog.net/600/400?id=3', 'https://placedog.net/600/400?id=104', 'https://placedog.net/600/400?id=105'] }
    };

    const modal = document.getElementById('pet-modal');
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const closeButton = modal.querySelector('.close-button');
        const prevButton = modal.querySelector('.prev');
        const nextButton = modal.querySelector('.next');
        
        let currentPetId = null;
        let currentImageIndex = 0;

        function updateModalImage() {
            const pet = petData[currentPetId];
            modalImage.src = pet.images[currentImageIndex];
            modalImage.alt = `Foto de ${pet.name} ${currentImageIndex + 1}`;
        }

        function changeSlide(direction) {
            const petImages = petData[currentPetId].images;
            currentImageIndex = (currentImageIndex + direction + petImages.length) % petImages.length;
            updateModalImage();
        }

        document.querySelectorAll('.pet-card .image-container').forEach(container => {
            container.addEventListener('click', () => {
                currentPetId = container.closest('.pet-card').dataset.petId;
                currentImageIndex = 0;
                updateModalImage();
                modal.classList.add('visible');
            });
        });

        closeButton.addEventListener('click', () => modal.classList.remove('visible'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('visible'); });
        prevButton.addEventListener('click', () => changeSlide(-1));
        nextButton.addEventListener('click', () => changeSlide(1));
    }


    /* ---------------------------------- */
    /* LÓGICA DO FAQ (PÁGINA 04)      */
    /* ---------------------------------- */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            
            // Fecha todas as respostas abertas
            document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                openAnswer.classList.remove('open');
                openAnswer.previousElementSibling.classList.remove('active');
            });
            
            // Abre ou fecha a resposta clicada
            if (!isOpen) {
                answer.classList.add('open');
                button.classList.add('active');
            }
        });
    });


    /* ---------------------------------- */
    /* LÓGICA DE ENVIO DE FORMULÁRIOS  */
    /* ---------------------------------- */
    const forms = document.querySelectorAll('#contact-form, #general-contact-form');
    
    forms.forEach(form => {
        const resultDiv = form.parentNode.querySelector('#form-result');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            if(resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = "Enviando...";
                resultDiv.style.backgroundColor = '#dcd0ff'; // Lilás
                resultDiv.style.color = '#5c5c5c';
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (resultDiv) {
                    if (response.status == 200) {
                        resultDiv.innerHTML = "Mensagem enviada com sucesso!";
                        resultDiv.style.backgroundColor = '#e8f5e9'; // Verde
                        resultDiv.style.color = '#2e7d32';
                    } else {
                        console.log(response);
                        resultDiv.innerHTML = jsonResponse.message;
                        resultDiv.style.backgroundColor = '#f8c8dc'; // Rosa
                        resultDiv.style.color = '#c62828';
                    }
                }
            })
            .catch(error => {
                console.log(error);
                if(resultDiv) {
                    resultDiv.innerHTML = "Algo deu errado. Tente novamente mais tarde.";
                    resultDiv.style.backgroundColor = '#f8c8dc';
                    resultDiv.style.color = '#c62828';
                }
            })
            .then(function() {
                form.reset();
                if(resultDiv) {
                    setTimeout(() => {
                        resultDiv.style.display = 'none';
                    }, 5000);
                }
            });
        });
    });

});
