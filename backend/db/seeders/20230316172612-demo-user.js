'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'jane@email.com',
        username: 'jane',
        firstName: 'Jane',
        lastName: 'Capaldi',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'serghei@email.com',
        username: 'serghei',
        firstName: 'Serghei',
        lastName: 'Mineev',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'adam@email.com',
        username: 'adam',
        firstName: 'Adam',
        lastName: 'Some',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'michael@email.com',
        username: 'MichaelScott',
        firstName: 'Michael',
        lastName: 'Scott',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'secret_michael@email.com',
        username: 'MichaelScarn',
        firstName: 'Michael',
        lastName: 'Scarn',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Alexandro_Reinger58@yahoo.com',
        username: 'Alexandro.Reinger',
        firstName: 'Alexandro',
        lastName: 'Reinger',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Sally_Stamm@hotmail.com',
        username: 'Sally24',
        firstName: 'Sally',
        lastName: 'Stamm',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Ariane2@yahoo.com',
        username: 'Ariane27',
        firstName: 'Ariane',
        lastName: 'Lang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Waldo.Glover@hotmail.com',
        username: 'Waldo.Glover',
        firstName: 'Waldo',
        lastName: 'Glover',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Alan_OConner31@hotmail.com',
        username: 'Alan_OConner24',
        firstName: 'Alan',
        lastName: "O'Conner",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Claudine.Greenholt@yahoo.com',
        username: 'Claudine.Greenholt27',
        firstName: 'Claudine',
        lastName: 'Greenholt',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Margarett_Fisher75@yahoo.com',
        username: 'Margarett_Fisher',
        firstName: 'Margarett',
        lastName: 'Fisher',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Keyshawn16@gmail.com',
        username: 'Keyshawn17',
        firstName: 'Keyshawn',
        lastName: 'Graham',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Thurman_Conroy@yahoo.com',
        username: 'Thurman5',
        firstName: 'Thurman',
        lastName: 'Conroy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Osborne.Gutmann@hotmail.com',
        username: 'Osborne_Gutmann46',
        firstName: 'Osborne',
        lastName: 'Gutmann',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Annabelle_Frami35@hotmail.com',
        username: 'Annabelle_Frami',
        firstName: 'Annabelle',
        lastName: 'Frami',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Kristy44@gmail.com',
        username: 'Kristy_Thompson-Jenkins97',
        firstName: 'Kristy',
        lastName: 'Thompson-Jenkins',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Shanel39@yahoo.com',
        username: 'Shanel_Doyle51',
        firstName: 'Shanel',
        lastName: 'Doyle',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Dayton.Kuhlman50@yahoo.com',
        username: 'Dayton76',
        firstName: 'Dayton',
        lastName: 'Kuhlman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Makenzie.Parker79@yahoo.com',
        username: 'Makenzie_Parker',
        firstName: 'Makenzie',
        lastName: 'Parker',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Aimee91@hotmail.com',
        username: 'Aimee.Prosacco56',
        firstName: 'Aimee',
        lastName: 'Prosacco',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Hector_Kiehn17@yahoo.com',
        username: 'Hector_Kiehn',
        firstName: 'Hector',
        lastName: 'Kiehn',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Maribel.Wilkinson82@gmail.com',
        username: 'Maribel48',
        firstName: 'Maribel',
        lastName: 'Wilkinson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Joan_Schoen@gmail.com',
        username: 'Joan_Schoen9',
        firstName: 'Joan',
        lastName: 'Schoen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Sienna.West29@gmail.com',
        username: 'Sienna_West30',
        firstName: 'Sienna',
        lastName: 'West',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Cecilia93@hotmail.com',
        username: 'Cecilia_Koelpin',
        firstName: 'Cecilia',
        lastName: 'Koelpin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Hipolito.Boyer@hotmail.com',
        username: 'Hipolito17',
        firstName: 'Hipolito',
        lastName: 'Boyer',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Daron_Jacobi@hotmail.com',
        username: 'Daron_Jacobi',
        firstName: 'Daron',
        lastName: 'Jacobi',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Clint89@hotmail.com',
        username: 'Clint.Zboncak',
        firstName: 'Clint',
        lastName: 'Zboncak',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Luna37@hotmail.com',
        username: 'Luna12',
        firstName: 'Luna',
        lastName: 'Runolfsson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Oma_Ziemann9@yahoo.com',
        username: 'Oma_Ziemann68',
        firstName: 'Oma',
        lastName: 'Ziemann',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Darrell85@yahoo.com',
        username: 'Darrell.Schinner',
        firstName: 'Darrell',
        lastName: 'Schinner',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Timothy8@gmail.com',
        username: 'Timothy84',
        firstName: 'Timothy',
        lastName: 'Beatty',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Randall0@yahoo.com',
        username: 'Randall34',
        firstName: 'Randall',
        lastName: 'Cummings',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Shayna.Beier@hotmail.com',
        username: 'Shayna_Beier',
        firstName: 'Shayna',
        lastName: 'Beier',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Myah_Emard0@hotmail.com',
        username: 'Myah10',
        firstName: 'Myah',
        lastName: 'Emard',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Alfred.Wilderman@hotmail.com',
        username: 'Alfred.Wilderman',
        firstName: 'Alfred',
        lastName: 'Wilderman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Ulises21@hotmail.com',
        username: 'Ulises_Daniel',
        firstName: 'Ulises',
        lastName: 'Daniel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Alessandro57@hotmail.com',
        username: 'Alessandro_Lubowitz',
        firstName: 'Alessandro',
        lastName: 'Lubowitz',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Maribel.Cormier77@hotmail.com',
        username: 'Maribel54',
        firstName: 'Maribel',
        lastName: 'Cormier',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Glennie_Luettgen-Schoen@gmail.com',
        username: 'Glennie65',
        firstName: 'Glennie',
        lastName: 'Luettgen-Schoen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Enos_Larkin34@gmail.com',
        username: 'Enos_Larkin84',
        firstName: 'Enos',
        lastName: 'Larkin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Mikayla_Gerlach@hotmail.com',
        username: 'Mikayla57',
        firstName: 'Mikayla',
        lastName: 'Gerlach',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Ryann.Renner10@yahoo.com',
        username: 'Ryann_Renner',
        firstName: 'Ryann',
        lastName: 'Renner',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Shanny.OReilly36@gmail.com',
        username: 'Shanny92',
        firstName: 'Shanny',
        lastName: "O'Reilly",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Barbara_Schuster@gmail.com',
        username: 'Barbara.Schuster59',
        firstName: 'Barbara',
        lastName: 'Schuster',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Yasmine.Turcotte@gmail.com',
        username: 'Yasmine.Turcotte',
        firstName: 'Yasmine',
        lastName: 'Turcotte',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Matilda6@yahoo.com',
        username: 'Matilda0',
        firstName: 'Matilda',
        lastName: 'Collier',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Vernie18@gmail.com',
        username: 'Vernie92',
        firstName: 'Vernie',
        lastName: 'Beatty',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Brendan_Maggio-Welch@gmail.com',
        username: 'Brendan.Maggio-Welch',
        firstName: 'Brendan',
        lastName: 'Maggio-Welch',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'May_Schoen@gmail.com',
        username: 'May39',
        firstName: 'May',
        lastName: 'Schoen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Giovani48@hotmail.com',
        username: 'Giovani.Cummerata41',
        firstName: 'Giovani',
        lastName: 'Cummerata',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Constance.Ward@gmail.com',
        username: 'Constance_Ward',
        firstName: 'Constance',
        lastName: 'Ward',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Joany.Miller67@yahoo.com',
        username: 'Joany_Miller',
        firstName: 'Joany',
        lastName: 'Miller',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Yasmin_Wolff@hotmail.com',
        username: 'Yasmin_Wolff56',
        firstName: 'Yasmin',
        lastName: 'Wolff',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Ernest.Stracke@hotmail.com',
        username: 'Ernest.Stracke37',
        firstName: 'Ernest',
        lastName: 'Stracke',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Mason.Waelchi15@gmail.com',
        username: 'Mason.Waelchi20',
        firstName: 'Mason',
        lastName: 'Waelchi',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Alta55@gmail.com',
        username: 'Alta.Rolfson58',
        firstName: 'Alta',
        lastName: 'Rolfson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Teresa53@gmail.com',
        username: 'Teresa64',
        firstName: 'Teresa',
        lastName: 'Nolan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Evans.Murazik@yahoo.com',
        username: 'Evans38',
        firstName: 'Evans',
        lastName: 'Murazik',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Germaine_Shanahan70@hotmail.com',
        username: 'Germaine53',
        firstName: 'Germaine',
        lastName: 'Shanahan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Gideon22@hotmail.com',
        username: 'Gideon_Shields31',
        firstName: 'Gideon',
        lastName: 'Shields',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Greg_Hermiston@yahoo.com',
        username: 'Greg97',
        firstName: 'Greg',
        lastName: 'Hermiston',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Kennedy4@hotmail.com',
        username: 'Kennedy65',
        firstName: 'Kennedy',
        lastName: 'Morissette',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Adrian.Effertz52@hotmail.com',
        username: 'Adrian_Effertz',
        firstName: 'Adrian',
        lastName: 'Effertz',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Brenda_Wolff27@yahoo.com',
        username: 'Brenda6',
        firstName: 'Brenda',
        lastName: 'Wolff',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Raphael.Hickle22@hotmail.com',
        username: 'Raphael_Hickle',
        firstName: 'Raphael',
        lastName: 'Hickle',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Leonardo_Fisher@hotmail.com',
        username: 'Leonardo.Fisher83',
        firstName: 'Leonardo',
        lastName: 'Fisher',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Tiara_Dibbert99@hotmail.com',
        username: 'Tiara87',
        firstName: 'Tiara',
        lastName: 'Dibbert',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Jillian_McKenzie@hotmail.com',
        username: 'Jillian_McKenzie',
        firstName: 'Jillian',
        lastName: 'McKenzie',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Rosemarie.Schimmel@gmail.com',
        username: 'Rosemarie_Schimmel24',
        firstName: 'Rosemarie',
        lastName: 'Schimmel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Sonya.Wisozk@yahoo.com',
        username: 'Sonya51',
        firstName: 'Sonya',
        lastName: 'Wisozk',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Adrienne43@yahoo.com',
        username: 'Adrienne.Zemlak',
        firstName: 'Adrienne',
        lastName: 'Zemlak',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Kendrick.McKenzie@hotmail.com',
        username: 'Kendrick.McKenzie24',
        firstName: 'Kendrick',
        lastName: 'McKenzie',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Gregg3@hotmail.com',
        username: 'Gregg_Schuster65',
        firstName: 'Gregg',
        lastName: 'Schuster',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Kayli.Crooks@gmail.com',
        username: 'Kayli_Crooks47',
        firstName: 'Kayli',
        lastName: 'Crooks',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Rebecca_Smitham@hotmail.com',
        username: 'Rebecca.Smitham',
        firstName: 'Rebecca',
        lastName: 'Smitham',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Charity38@yahoo.com',
        username: 'Charity39',
        firstName: 'Charity',
        lastName: 'Keebler',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Timothy.Gutkowski@hotmail.com',
        username: 'Timothy.Gutkowski',
        firstName: 'Timothy',
        lastName: 'Gutkowski',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Cooper7@hotmail.com',
        username: 'Cooper.Hudson-Feest',
        firstName: 'Cooper',
        lastName: 'Hudson-Feest',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Maureen10@yahoo.com',
        username: 'Maureen.Borer',
        firstName: 'Maureen',
        lastName: 'Borer',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Della_Beahan@yahoo.com',
        username: 'Della32',
        firstName: 'Della',
        lastName: 'Beahan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Selena.West83@gmail.com',
        username: 'Selena.West',
        firstName: 'Selena',
        lastName: 'West',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Deborah_Russel2@hotmail.com',
        username: 'Deborah.Russel91',
        firstName: 'Deborah',
        lastName: 'Russel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Abraham7@yahoo.com',
        username: 'Abraham33',
        firstName: 'Abraham',
        lastName: 'Littel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Joy30@yahoo.com',
        username: 'Joy_Spencer',
        firstName: 'Joy',
        lastName: 'Spencer',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'General_Kohler77@gmail.com',
        username: 'General.Kohler38',
        firstName: 'General',
        lastName: 'Kohler',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Jarred_Keeling-Flatley40@yahoo.com',
        username: 'Jarred_Keeling-Flatley',
        firstName: 'Jarred',
        lastName: 'Keeling-Flatley',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Rodolfo97@hotmail.com',
        username: 'Rodolfo_McLaughlin-Walker',
        firstName: 'Rodolfo',
        lastName: 'McLaughlin-Walker',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Florence_Wilderman@yahoo.com',
        username: 'Florence_Wilderman10',
        firstName: 'Florence',
        lastName: 'Wilderman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Flavio_Walker@yahoo.com',
        username: 'Flavio.Walker75',
        firstName: 'Flavio',
        lastName: 'Walker',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Marcelina.Walsh41@yahoo.com',
        username: 'Marcelina49',
        firstName: 'Marcelina',
        lastName: 'Walsh',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Durward.Stokes@hotmail.com',
        username: 'Durward_Stokes13',
        firstName: 'Durward',
        lastName: 'Stokes',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Paige.Bradtke-Moen32@hotmail.com',
        username: 'Paige.Bradtke-Moen51',
        firstName: 'Paige',
        lastName: 'Bradtke-Moen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Hank.Wunsch@yahoo.com',
        username: 'Hank24',
        firstName: 'Hank',
        lastName: 'Wunsch',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Braeden91@hotmail.com',
        username: 'Braeden_Ebert',
        firstName: 'Braeden',
        lastName: 'Ebert',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Bartholome_Hessel@gmail.com',
        username: 'Bartholome_Hessel81',
        firstName: 'Bartholome',
        lastName: 'Hessel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Boyd25@gmail.com',
        username: 'Boyd.Nolan80',
        firstName: 'Boyd',
        lastName: 'Nolan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Elvis_Schmidt@hotmail.com',
        username: 'Elvis37',
        firstName: 'Elvis',
        lastName: 'Schmidt',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Santiago.Gibson@yahoo.com',
        username: 'Santiago_Gibson',
        firstName: 'Santiago',
        lastName: 'Gibson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Taya_Bergnaum67@hotmail.com',
        username: 'Taya30',
        firstName: 'Taya',
        lastName: 'Bergnaum',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Rosalind83@gmail.com',
        username: 'Rosalind_Konopelski57',
        firstName: 'Rosalind',
        lastName: 'Konopelski',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Reanna.Hermann99@yahoo.com',
        username: 'Reanna99',
        firstName: 'Reanna',
        lastName: 'Hermann',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Deshawn.Stark2@yahoo.com',
        username: 'Deshawn.Stark74',
        firstName: 'Deshawn',
        lastName: 'Stark',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Felicita.Graham-Sauer@gmail.com',
        username: 'Felicita69',
        firstName: 'Felicita',
        lastName: 'Graham-Sauer',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options);
  }
};
