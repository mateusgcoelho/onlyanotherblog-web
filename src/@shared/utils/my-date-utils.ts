export function getFormatedTime(milisegundos: number) {
  const horas = Math.floor(milisegundos / 3600000);
  const minutos = Math.floor((milisegundos % 3600000) / 60000);

  const tempoFormatado = ["Há "];

  if (horas > 0) {
    tempoFormatado.push(`${horas} horas`);
  }

  if (minutos > 0) {
    tempoFormatado.push(`${minutos} minutos`);
  }

  return tempoFormatado.join(" ");
}
