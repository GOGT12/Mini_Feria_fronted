

function validatePriceInput(value: string): string {
  // 1. Eliminar cualquier carácter que no sea un dígito (0-9) o un punto decimal (.).
  //    También remueve 'e', '-', '+' y otros símbolos.
  let cleanedValue = value.replace(/[^0-9.]/g, '');

  // 2. Manejar múltiples puntos decimales:
  //    Si hay más de un punto, mantiene solo el primero y elimina los demás.
  const parts = cleanedValue.split('.');
  if (parts.length > 2) {
    cleanedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  // 3. Si el valor comienza con un punto, anteponer un "0" para formar "0."
  if (cleanedValue.startsWith('.')) {
    cleanedValue = '0' + cleanedValue;
  }

  // 4. Restringir a un máximo de dos decimales después del punto.
  if (cleanedValue.includes('.')) {
    const [integerPart, decimalPart] = cleanedValue.split('.');
    if (decimalPart && decimalPart.length > 2) {
      cleanedValue = integerPart + '.' + decimalPart.substring(0, 2);
    }
  }

  // 5. Limitar la longitud de la parte entera a 10 dígitos (como en tu función original).
  //    Esto se aplica a la parte del número antes del punto decimal.
  if (cleanedValue.includes('.')) {
    const [integerPart, decimalPart] = cleanedValue.split('.');
    if (integerPart.length > 10) {
      cleanedValue = integerPart.substring(0, 10) + '.' + decimalPart;
    }
  } else {
    // Si no hay decimales, limitar la longitud total de la parte entera.
    if (cleanedValue.length > 10) {
      cleanedValue = cleanedValue.substring(0, 10);
    }
  }

  // 6. Asegurarse de que no haya ceros iniciales innecesarios (ej. "05" -> "5", pero "0.5" se mantiene)
  if (cleanedValue.length > 1 && cleanedValue.startsWith('0') && !cleanedValue.startsWith('0.')) {
    cleanedValue = cleanedValue.substring(1);
  }

  // Si el valor final es solo "0", "0.", o vacío, permitirlo.
  if (cleanedValue === '' || cleanedValue === '0' || cleanedValue === '0.') {
    return cleanedValue;
  }

  // Última verificación para asegurar que el resultado es numérico válido
  // Esto es un seguro extra, ya que los pasos anteriores deberían manejarlo.
  const finalNumericValue = parseFloat(cleanedValue);
  if (isNaN(finalNumericValue) && cleanedValue !== '' && cleanedValue !== '.') {
    return '';
  }

  return cleanedValue; // Devolver la cadena limpia y lista para el input
}



function validateStockInput(value: string): string {
  // 1. Eliminar cualquier carácter que no sea un dígito (0-9).
  let cleanedValue = value.replace(/[^0-9]/g, '');

  // 2. Asegurarse de que no sea negativo (si el usuario intenta pegar "-").
  //    Como el stock no puede ser negativo, simplemente eliminamos cualquier signo negativo.
  if (cleanedValue.startsWith('-')) {
    cleanedValue = cleanedValue.substring(1);
  }

  // 3. Eliminar ceros iniciales innecesarios (ej. "05" se convierte en "5", "000" se convierte en "0").
  if (cleanedValue.length > 1 && cleanedValue.startsWith('0')) {
    cleanedValue = parseInt(cleanedValue, 10).toString(); // Convierte a número y luego a string para quitar ceros
  }

  // 4. Limitar la longitud máxima (ej. 10 dígitos, similar al precio). Ajusta este valor si es necesario.
  const MAX_LENGTH = 10;
  if (cleanedValue.length > MAX_LENGTH) {
    cleanedValue = cleanedValue.substring(0, MAX_LENGTH);
  }

  // Si el valor es vacío, permitirlo.
  if (cleanedValue === '') {
    return '';
  }

  // Convertir a número para una validación final y asegurar que no es NaN, luego a string.
  const numericValue = parseInt(cleanedValue, 10);
  if (isNaN(numericValue)) {
    return ''; // Si no es un número válido después de la limpieza, retorna vacío
  }

  return cleanedValue; // Devolver la cadena limpia y validada
}


export default {
  validatePriceInput,
  validateStockInput,
}
