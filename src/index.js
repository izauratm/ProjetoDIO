function identificarBandeira(numeroCartao) {
  const numero = numeroCartao.replace(/\D/g, '');
  

  // Visa: Começa com 4 e tem 16 dígitos
  if (/^4\d{15}$/.test(numero)) {
    return 'Visa';
  }
  // MasterCard: 51-55 ou 2221-2720
  if (/^(5[1-5]|2221|222[2-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(numero)) {
    return 'MasterCard';
  }
  // Elo: 4011, 4312, 4389
  if (/^(4011|4312|4389)/.test(numero)) {
    return 'Elo';
  }
  // American Express: 34 ou 37
  if (/^3[47]/.test(numero)) {
    return 'American Express';
  }
  // Discover: 6011, 65, 644-649
  if (/^(6011|65|64[4-9])/.test(numero)) {
    return 'Discover';
  }
  // Hipercard: geralmente começa com 6062
  if (/^6062/.test(numero)) {
    return 'Hipercard';
  }
  // Voyager: começa com 8699
  if (/^8699/.test(numero)) {
    return 'Voyager';
  }
  // JCB: começa com 35
  if (/^35/.test(numero)) {
    return 'JCB';
  }
  // Aura: começa com 50
  if (/^50/.test(numero)) {
    return 'Aura';
  }
  // Enroute: começa com 2014 ou 2149
  if (/^(2014|2149)/.test(numero)) {
    return 'Enroute';
  }
  return 'Bandeira não identificada';
}

// Exemplo de uso:
console.log(identificarBandeira('4111111111111111')); // Visa
console.log(identificarBandeira('5277959558870483')); // MasterCard
console.log(identificarBandeira('4011788888881881')); // Elo
console.log(identificarBandeira('371449635398431'));  // American Express
console.log(identificarBandeira('6011111111111117')); // Discover
console.log(identificarBandeira('6062825624254001')); // Hipercard
console.log(identificarBandeira('8699123412341234')); // Voyager
console.log(identificarBandeira('3528123456789012')); // JCB
console.log(identificarBandeira('5012345678901234')); // Aura
console.log(identificarBandeira('201412341234123'));  // Enroute