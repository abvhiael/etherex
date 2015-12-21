import bigRat from 'big-rational';

var units = {
  "Usoil": bigRat("1000000000000000000000000000000000000000000000000000000"),
  "Vsoil": bigRat("1000000000000000000000000000000000000000000000000000"),
  "Dsoil": bigRat("1000000000000000000000000000000000000000000000000"),
  "Nsoil": bigRat("1000000000000000000000000000000000000000000000"),
  "Ysoil": bigRat("1000000000000000000000000000000000000000000"),
  "Zsoil": bigRat("1000000000000000000000000000000000000000"),
  "Esoil": bigRat("1000000000000000000000000000000000000"),
  "Psoil": bigRat("1000000000000000000000000000000000"),
  "Tsoil": bigRat("1000000000000000000000000000000"),
  "Gsoil": bigRat("1000000000000000000000000000"),
  "Msoil": bigRat("1000000000000000000000000"),
  "Ksoil": bigRat("1000000000000000000000"),
   "soil": bigRat("1000000000000000000"),
  "finney": bigRat("1000000000000000"),
   "szabo": bigRat("1000000000000"),
    "Gwei": bigRat("1000000000"),
    "Mwei": bigRat("1000000"),
    "Kwei": bigRat("1000"),
     "wei": bigRat("1")
};

module.exports = units;
