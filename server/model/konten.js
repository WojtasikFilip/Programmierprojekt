const db = require('../db/index');

async function getKonten() {
  const { rows } = await db.query('SELECT * FROM konten');
  return rows;
}

async function getKonto(kartennummer) {
  const { rows } = await db.query('SELECT * FROM konten where kartennummer = $1', [kartennummer]);
  return rows;
}

async function patchKonten(kartennummer, data) {
  const props = [];
  // eslint-disable-next-line guard-for-in
  for (const prop in data) props.push(`${prop} = '${data[prop]}'`);
  const cmd = `UPDATE konten set ${props.join(',')} where kartennummer = $1`;
  await db.query(cmd, [kartennummer]);
}

async function deleteKonto(kartennummer) {
  await db.query('DELETE from konten where kartennummer = $1', [kartennummer]);
}

async function addKonto(k, kartennummer, kundennummer) {
  await db.query(
    'INSERT into konten(kartennummer,iban,kontostand,konto_seit,fk_kundennummer) values($1,$2,$3,$4,$5)',
    [kartennummer, k.iban, k.kontostand, k.konto_seit, kundennummer],
  );
}

module.exports = { getKonten, getKonto, patchKonten, deleteKonto, addKonto };
