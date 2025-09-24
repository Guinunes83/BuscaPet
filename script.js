document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS DOS PETS (SIMULANDO UM BANCO DE DADOS) ---
    const petData = {
        '1': {
            name: 'Caramelo',
            images: [
                'https://placedog.net/600/400?id=1',
                'https://placedog.net/600/400?id=101',
                'https://placedog.net/600/400?id=102'
            ]
        },
        '2': {
            name: 'Flocos',
            images: [
                'https://placedog.net/600/400?id=2',
                'https://placedog.net/600/400?id=103'
            ]
        },
        '3': {
            name: 'Luna',
            images: [
                'https://placedog.net/600/400?id=3',
                'https://placedog.net/600/400?id=104',
                'https://placedog.net/600/400?id=105',
                'https://placedog.net/600/400?id=106'
            ]
        }
    };

    // --- VARIÁVEIS DO MODAL ---
    const modal = document.getElementById('pet-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentPetId = null;
    let currentImageIndex = 0;

    // --- FUNÇÕES PARA CONTROLAR O MODAL ---

    function openModal(petId) {
        currentPetId = petId;
        currentImageIndex = 0;
        updateModalImage();
        modal.classList.add('visible');
    }

    function closeModal() {
        modal.classList.remove('visible');
    }

    function updateModalImage() {
        const pet = petData[currentPetId];
        modalImage.src = pet.images[currentImageIndex];
        modalImage.alt = `Foto de ${pet.name} ${currentImageIndex + 1} de ${pet.images.length}`;
    }

    function changeSlide(direction) {
        const pet = petData[currentPetId];
        currentImageIndex += direction;

        if (currentImageIndex >= pet.images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = pet.images.length - 1;
        }
        
        updateModalImage();
    }

    // --- ADICIONANDO OS EVENTOS ---

    // ALTERAÇÃO AQUI: Ouvindo o clique no novo container da imagem
    document.querySelectorAll('.pet-image-container').forEach(container => {
        container.addEventListener('click', () => {
            const petId = container.closest('.pet-card').dataset.petId;
            openModal(petId);
        });
    });

    // Fechar o modal
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Mudar de foto
    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));

});
// Verifica se o formulário de contato existe na página atual
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // 1. Impede o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // 2. Simula o envio (aqui você pode ver os dados no console do navegador)
        const formData = new FormData(contactForm);
        console.log('Dados do formulário:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // 3. Mostra a mensagem de sucesso
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';

        // 4. Limpa o formulário
        contactForm.reset();

        // 5. Esconde a mensagem de sucesso após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
}
// Lógica para o Acordeão do FAQ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqAnswer = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        } else {
            faqAnswer.style.maxHeight = 0;
        }
    });
});


// Lógica para o formulário de contato geral
const generalContactForm = document.getElementById('general-contact-form');

if (generalContactForm) {
    generalContactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const successMessage = document.getElementById('general-success-message');
        successMessage.style.display = 'block';

        generalContactForm.reset();

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
}