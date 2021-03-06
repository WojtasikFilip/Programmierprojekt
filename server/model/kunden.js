const db = require('../db/index');

async function getKunden() {
  const { rows } = await db.query('SELECT * FROM kunden');
  return rows;
}

async function getKunde(kundennummer) {
  const { rows } = await db.query('SELECT * FROM kunden where kundennummer = $1', [kundennummer]);
  return rows;
}

async function getKundenKonten(kundennummer) {
  const { rows } = await db.query(
    'select konten.* from konten join kunden k on k.kundennummer = konten.fk_kundennummer where k.kundennummer = $1',
    [kundennummer],
  );
  return rows;
}

async function patchKunde(kundennummer, data) {
  const props = [];
  // eslint-disable-next-line guard-for-in
  for (const prop in data) props.push(`${prop} = '${data[prop]}'`);
  const cmd = `UPDATE kunden set ${props.join(',')} where kundennummer = $1`;
  await db.query(cmd, [kundennummer]);
}

async function deleteKunde(kundennummer) {
  await db.query('DELETE from kunden where kundennummer = $1', [kundennummer]);
}

async function addKunde(k, kundennummer) {
  await db.query(
    'INSERT INTO kunden (kundennummer,geburtsdatum,adresse,vorname,nachname) values($1,$2,$3,$4,$5)',
    [kundennummer, k.geburtsdatum, k.adresse, k.vorname, k.nachname],
  );
}

module.exports = { getKunden, getKunde, getKundenKonten, patchKunde, deleteKunde, addKunde };
