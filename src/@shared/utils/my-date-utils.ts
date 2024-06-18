export function getFormatedTime(milisegundos: number) {
  const horas = Math.floor(milisegundos / 3600000);
  const minutos = Math.floor((milisegundos % 3600000) / 60000);

  const tempoFormatado = ["Há "];

  if (minutos <= 0) {
    return "Postado recentemente.";
  }

  if (horas > 0) {
    tempoFormatado.push(`${horas} hora(s)`);
  }

  if (minutos > 0) {
    tempoFormatado.push(`${minutos} minuto(s)`);
  }

  return tempoFormatado.join(" ");
}
