class Annonce {
  constructor(titre, image, description, idUser, id) {
    this.titre = titre;
    this.image = image;
    this.description = description;
    this.idUser = idUser;
    this.id = id;
  }
}

module.exports = { Annonce };
