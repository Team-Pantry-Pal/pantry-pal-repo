// Potential object to how auth info
auth = {
  isAuth: false,
  authenticate() {
    fetch('auth/user', {
      credentials: 'include'
    })
    .then(res => {
      this.isAuth = true;
      console.log(res);
      console.log(this.isAuth);
    })
    .catch(err => console.log('Error fetching authorized user.', err))
  }
};