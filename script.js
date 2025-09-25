document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------- */
    /* LÓGICA DA GALERIA DE FOTOS (SEÇÃO 01) */
    /* ---------------------------------- */
    const petData = {
        '1': { name: 'Caramelo', images: ['https://placedog.net/600/400?id=1', 'https://placedog.net/600/400?id=101'] },
        '2': { name: 'Flocos', images: ['https://placedog.net/600/400?id=2', 'https://placedog.net/600/400?id=103'] },
        '3': { name: 'Luna', images: ['https://placedog.net/600/400?id=3', 'https://placedog.net/600/400?id=104'] },
        '4': { name: 'Thor', images: ['https://placedog.net/600/400?id=4', 'https://placedog.net/600/400?id=105'] },
        '5': { name: 'Mel', images: ['https://placedog.net/600/400?id=5', 'https://placedog.net/600/400?id=106'] },
        '6': { name: 'Bidu', images: ['https://placedog.net/600/400?id=6', 'https://placedog.net/600/400?id=107'] },
        '7': { name: 'Nina', images: ['https://placedog.net/600/400?id=7', 'https://placedog.net/600/400?id=108'] },
        '8': { name: 'Zeca', images: ['https://placedog.net/600/400?id=8', 'https://placedog.net/600/400?id=109'] },
        '9': { name: 'Frida', images: ['https://placedog.net/600/400?id=9', 'https://placedog.net/600/400?id=110'] },
        '10': { name: 'Marley', images: ['https://placedog.net/600/400?id=10', 'https://placedog.net/600/400?id=111'] },
        '11': { name: 'Chico', images: ['https://placedog.net/600/400?id=11', 'https://placedog.net/600/400?id=112'] },
        '12': { name: 'Cacau', images: ['https://placedog.net/600/400?id=12', 'https://placedog.net/600/400?id=113'] },
        '13': { name: 'Romeu', images: ['https://placedog.net/600/400?id=13', 'https://placedog.net/600/400?id=114'] }
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
            if (!petData[currentPetId]) return;
            const pet = petData[currentPetId];
            modalImage.src = pet.images[currentImageIndex];
            modalImage.alt = `Foto de ${pet.name} ${currentImageIndex + 1}`;
        }

        function changeSlide(direction) {
            if (!petData[currentPetId]) return;
            const petImages = petData[currentPetId].images;
            currentImageIndex = (currentImageIndex + direction + petImages.length) % petImages.length;
            updateModalImage();
        }

        document.querySelectorAll('.pet-card .image-container').forEach(container => {
            container.addEventListener('click', () => {
                const petId = container.closest('.pet-card').dataset.petId;
                if(petId) {
                    currentPetId = petId;
                    currentImageIndex = 0;
                    updateModalImage();
                    modal.classList.add('visible');
                }
            });
        });

        if (closeButton) closeButton.addEventListener('click', () => modal.classList.remove('visible'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('visible'); });
        if (prevButton) prevButton.addEventListener('click', () => changeSlide(-1));
        if (nextButton) nextButton.addEventListener('click', () => changeSlide(1));
    }


    /* ---------------------------------- */
    /* LÓGICA DO FAQ (SEÇÃO 04)         */
    /* ---------------------------------- */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                openAnswer.classList.remove('open');
                openAnswer.previousElementSibling.classList.remove('active');
            });
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
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            const resultDiv = form.parentNode.querySelector('.form-result-message');
            
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = "Enviando...";
            resultDiv.style.backgroundColor = '#dcd0ff';
            resultDiv.style.color = '#5c5c5c';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    resultDiv.innerHTML = jsonResponse.message || "Mensagem enviada com sucesso!";
                    resultDiv.style.backgroundColor = '#e8f5e9'; // Verde
                    resultDiv.style.color = '#2e7d32';
                } else {
                    console.log(response);
                    resultDiv.innerHTML = jsonResponse.message;
                    resultDiv.style.backgroundColor = '#f8c8dc'; // Rosa
                    resultDiv.style.color = '#c62828';
                }
            })
            .catch(error => {
                console.log(error);
                resultDiv.innerHTML = "Algo deu errado. Tente novamente mais tarde.";
                resultDiv.style.backgroundColor = '#f8c8dc';
                resultDiv.style.color = '#c62828';
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    resultDiv.style.display = 'none';
                }, 5000);
            });
        });
    });

    /* ----------------------------------------- */
    /* ATUALIZA O MENU CONFORME A ROLAGEM  */
    /* ----------------------------------------- */
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.site-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.site-menu a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});