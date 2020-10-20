const fetch = require("node-fetch");
const context = require("./context");

/**
 * Generates an amount of users and connections for those users
 *
 * @returns {Promise<String>} returns the list of users
 *
 */

module.exports = async function () {
  const myContacts = [];
  for (var j = 0; j < 50; j++) {
    const names = [
      "Aaron",
      "Aiden",
      "Alexander",
      "Andrew",
      "Anthony",
      "Arthur",
      "Connor",
      "Charly",
      "Christopher",
      "Elliot",
      "Ethan",
      "Harrison",
      "Jacob",
      "Jeffrey",
      "Jake",
      "Jeremy",
      "Jordan",
      "Joseph",
      "Joshua",
      "Mason",
      "Matthew",
      "Max",
      "Michael",
      "Noah",
      "Riley",
      "Steven",
      "Thomas",
      "Toby",
      "William",
      "Aritz",
      "Axel",
      "Borja",
      "Bruno",
      "Dante",
      "Darío",
      "Derek",
      "Dylan",
      "Elian",
      "Enzo",
      "Gael",
      "Gorka",
      "Ian",
      "Igor",
      "Iker",
      "Isaac",
      "Julen",
      "Kai",
      "Leo",
      "Liam",
      "Luca",
      "Marc",
      "Marcos",
      "Martín",
      "Matías",
      "Noah",
      "Oliver",
      "Unai",
      "Uriel",
      "Nic",
      "Sofía",
      "Lucía",
      "María",
      "Paula",
      "Daniela",
      "Valeria",
      "Julia",
      "Alba",
      "Claudia",
      "Isabella",
      "Romina",
      "Jimena",
      "Emma",
      "Irene",
      "Martina",
      "Sara",
      "Laura",
      "Alessandra",
      "Alessia",
      "Alfonsina",
      "Antonella",
      "Bianca",
      "Carina",
      "Chiara",
      "Fiorella",
      "Francesca",
      "Gabriella",
      "Gianna",
      "Lorenza",
      "Marena",
      "Mellea",
      "Nicoletta",
      "Orazia",
      "Pia",
      "Stella",
      "Zinerva",
    ];

    const surnames = [
      "González",
      "Rodríguez",
      "Gómez",
      "Fernández",
      "López",
      "Díaz",
      "Martínez",
      "Pérez",
      "García",
      "Sánchez",
      "Romero",
      "Sosa",
      "Torres",
      "Álvarez",
      "Ruiz",
      "Ramírez",
      "Flores",
      "Benítez",
      "Acosta",
      "Medina",
      "Herrera",
      "Suárez",
      "Aguirre",
      "Giménez",
      "Gutiérrez",
      "Pereyra",
      "Rojas",
      "Molina",
      "Castro",
      "Ortiz",
      "Silva",
      "Núñez",
      "Luna",
      "Juárez",
      "Cabrera",
      "Ríos",
      "Morales",
      "Godoy",
      "Moreno",
      "Ferreyra",
      "Domínguez",
      "Carrizo",
      "Peralta",
      "Castillo",
      "Ledesma",
      "Quiroga",
      "Vega",
      "Vera",
      "Muñoz",
      "Ojeda",
      "Ponce",
      "Villalba",
      "Cardozo",
      "Navarro",
      "Coronel",
      "Vázquez",
      "Ramos",
      "Vargas",
      "Cáceres",
      "Arias",
      "Figueroa",
      "Córdoba",
      "Correa",
      "Maldonado",
      "Paz",
      "Rivero",
      "Miranda",
      "Mansilla",
      "Farias",
      "Roldán",
      "Méndez",
      "Guzmán",
      "Agüero",
      "Hernández",
      "Lucero",
      "Cruz",
      "Páez",
      "Escobar",
      "Mendoza",
      "Barrios",
      "Bustos",
      "Ávila",
      "Ayala",
      "Blanco",
      "Soria",
      "Maidana",
      "Acuña",
      "Leiva",
      "Duarte",
      "Moyano",
      "Campos",
      "Soto",
      "Martín",
      "Valdez",
      "Bravo",
      "Chávez",
      "Velázquez",
      "Olivera",
      "Toledo",
      "Franco",
    ];

    const emailDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "aol.com",
      "hotmail.co.uk",
      "hotmail.fr",
      "msn.com",
      "yahoo.fr",
      "wanadoo.f",
      "orange.fr",
      "comcast.net",
      "yahoo.co.uk",
      "yahoo.com.br",
      "yahoo.co.i",
      "live.com",
      "rediffmail.com",
      "free.fr",
      "gmx.de",
      "web.de",
      "yandex.ru",
      "ymail.com",
      "libero.it",
      "outlook.com",
      "uol.com.br",
      "bol.com.br",
      "mail.ru",
      "cox.net",
      "hotmail.it",
      "sbcglobal.net",
      "sfr.fr",
      "live.fr",
      "verizon.net",
      "live.co.uk",
      "googlemail.co",
      "yahoo.e",
      "ig.com.br",
      "live.nl",
      "bigpond.com",
      "terra.com.br",
      "yahoo.it",
      "neuf.fr",
      "yahoo.de",
      "alice.it",
      "rocketmail.com",
      "att.net",
      "laposte.net",
      "facebook.com",
      "bellsouth.net",
      "yahoo.in",
      "hotmail.es",
      "charter.net",
      "yahoo.ca",
      "yahoo.com.au",
      "rambler.ru",
      "hotmail.de",
      "tiscali.i",
      "shaw.c",
      "yahoo.co.j",
      "sky.co",
      "earthlink.net",
      "optonline.net",
      "freenet.de",
      "t-online.de",
      "aliceadsl.fr",
      "virgilio.it",
      "home.nl",
      "qq.com",
      "telenet.be",
      "me.com",
      "yahoo.com.ar",
      "tiscali.co.uk",
      "yahoo.com.mx",
      "voila.fr",
      "gmx.net",
      "mail.com",
      "planet.nl",
      "tin.it",
      "live.it",
      "ntlworld.com",
      "arcor.de",
      "yahoo.co.id",
      "frontiernet.net",
      "hetnet.nl",
      "live.com.au",
      "yahoo.com.sg",
      "zonnet.nl",
      "club-internet.fr",
      "juno.com",
      "optusnet.com.au",
      "blueyonder.co.uk",
      "bluewin.ch",
      "skynet.be",
      "sympatico.ca",
      "windstream.net",
      "mac.com",
      "centurytel.net",
      "chello.nl",
      "live.ca",
      "aim.com",
    ];

    const firstName = `${names[Math.floor(names.length * Math.random())]}`;

    const surname = `${surnames[Math.floor(surnames.length * Math.random())]}`;

    const username = `${firstName.toLowerCase()}${Math.floor(
      99 * Math.random()
    )}`;

    const email = `${username.toLocaleLowerCase()}@${
      emailDomains[Math.floor(emailDomains.length * Math.random())]
    }`;

    const password = "123123123";

    const background =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

    const linkedin = `https://www.linkedin.com/in/${firstName}/`;
    const facebook = `https://www.facebook.com/${firstName}/`;
    const instagram = `https://www.instagram.com/${firstName}/`;

    let profilePicture = `https://picsum.photos/id/${Math.floor(
      1084 * Math.random()
    )}/300/200`;

    const contacts = [];

    for (var i = 0; i < 20; i++) {
      let _firstName = `${names[Math.floor(names.length * Math.random())]}`;

      let _surname = `${surnames[Math.floor(surnames.length * Math.random())]}`;

      let _username = `${_firstName.toLowerCase()}${Math.floor(
        99 * Math.random()
      )}`;

      let _profilePicture = `https://picsum.photos/id/${Math.floor(
        1084 * Math.random()
      )}/300/200`;

      contacts.push({
        name: _firstName + " " + _surname,
        username: _username,
        profilePicture: _profilePicture,
      });
    }

    const output = {
      name: firstName + " " + surname,
      username,
      email,
      password,
      background,
      social: { linkedin, facebook, instagram },
      contacts,
      profilePicture,
    };

    await fetch(`${this.API_URL}/users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(output),
    });

    myContacts.push({
      name: output.name,
      username: output.username,
      profilePicture: output.profilePicture,
    });
  }
  return myContacts;
}.bind(context);
