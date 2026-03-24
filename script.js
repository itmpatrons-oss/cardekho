const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

const menuToggle = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');
menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if(mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
    }
});
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
    });
});

function scrollToFleet() {
    document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
}

const scrollElements = document.querySelectorAll('.scroll-element');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) el.classList.add('scrolled');
    });
}
window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

const filterBtns = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        carCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-type') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'none'; card.offsetHeight; card.style.animation = null;
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const modal = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.close-modal');
const bookNowBtns = document.querySelectorAll('.book-now-btn');
const modalCarName = document.getElementById('modal-car-name');
const modalPricePerDay = document.getElementById('modal-price-per-day');
const modalTotalDays = document.getElementById('modal-total-days');
const modalTotalCost = document.getElementById('modal-total-cost');
const pickupInput = document.getElementById('modal-pickup-date');
const dropoffInput = document.getElementById('modal-dropoff-date');
const nameInput = document.getElementById('modal-name');
const mobileInput = document.getElementById('modal-mobile');
const emailInput = document.getElementById('modal-email');
const messageInput = document.getElementById('modal-message');

let currentCarPrice = 0;

bookNowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const carName = btn.getAttribute('data-car');
        currentCarPrice = parseInt(btn.getAttribute('data-price'));
        modalCarName.innerText = carName;
        modalPricePerDay.innerText = currentCarPrice;
        pickupInput.value = ''; dropoffInput.value = '';
        if(nameInput) nameInput.value = '';
        if(mobileInput) mobileInput.value = '';
        if(emailInput) emailInput.value = '';
        if(messageInput) messageInput.value = '';
        modalTotalDays.innerText = '0'; modalTotalCost.innerText = '0';
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    });
});

const closeModal = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
};

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

const calculatePrice = () => {
    const pickupDate = new Date(pickupInput.value);
    const dropoffDate = new Date(dropoffInput.value);
    if (pickupInput.value && dropoffInput.value) {
        if (dropoffDate >= pickupDate) {
            const timeDiff = dropoffDate.getTime() - pickupDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const days = daysDiff === 0 ? 1 : daysDiff;
            modalTotalDays.innerText = days;
            modalTotalCost.innerText = (days * currentCarPrice).toLocaleString();
        } else {
            modalTotalDays.innerText = '0'; modalTotalCost.innerText = '0';
        }
    }
};

pickupInput.addEventListener('change', calculatePrice);
dropoffInput.addEventListener('change', calculatePrice);

document.getElementById('hero-booking-form').addEventListener('submit', (e) => {
    e.preventDefault(); scrollToFleet();
});

document.getElementById('modal-booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pickup = new Date(pickupInput.value);
    const dropoff = new Date(dropoffInput.value);
    if(!pickupInput.value || !dropoffInput.value) return alert("Select dates.");
    if(dropoff < pickup) return alert("Drop-off cannot be before pick-up.");
    closeModal();
    const toast = document.getElementById('toast');
    toast.className = "toast show";
    setTimeout(() => toast.className = toast.className.replace("show", ""), 3000);
});
