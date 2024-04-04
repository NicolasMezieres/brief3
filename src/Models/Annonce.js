class Annonce {
  constructor(id, titre, image, description, idUser) {
    this.id = id;
    this.titre = titre;
    this.image = image;
    this.description = description;
    this.idUser = idUser;
  }
}

module.exports = { Annonce };
