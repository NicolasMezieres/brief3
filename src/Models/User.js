class User {
  constructor(firstName, lastName, email, password, role, gdpr, isActive) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.gdpr = gdpr;
    this.isActive = isActive;
  }
}
module.exports = { User };
