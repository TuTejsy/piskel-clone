export default function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const profileContainer = document.querySelector('.profile-container');
  const profileImage = document.querySelector('.profile-container .profile-image');
  const profileUsername = document.querySelector('.profile-container .profile-username');
  const siginIn = document.querySelector('.g-signin2');

  profileImage.style.background = `url('${profile.getImageUrl()}') center center no-repeat`;
  profileImage.style.backgroundSize = 'cover';
  profileUsername.innerText = profile.getName();
  profileContainer.style.display = 'flex';
  profileContainer.parentNode.removeChild(siginIn);
}
