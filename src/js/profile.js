profileBtn = document.querySelector('.header-profile');
profileMenu = document.querySelector('.profile-menu');

profileBtn.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
});